import { fetchNgwLayerItemsRequest } from '@nextgis/ngw-kit';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type NgwConnector from '@nextgis/ngw-connector';
import type { FetchNgwItemsOptions } from '@nextgis/ngw-kit';
import type { PropertiesFilter } from '@nextgis/properties-filter';
import type { FeatureLayerFieldRead } from '@nextgisweb/feature-layer/type/api';
import type { CompositeRead } from '@nextgisweb/resource/type/api';

type ResourceDefinition = number | string;

type UseResourceOptions = {
  connector: NgwConnector;
  cache?: boolean;
};

type GetFieldValuesOptions = {
  field: string;
  filters?: PropertiesFilter[];
  limit?: number;
  cache?: boolean;
  includeEmpty?: boolean;
};

export function useResource(
  resource: ResourceDefinition | undefined,
  options: UseResourceOptions,
) {
  const { connector, cache = true } = options;

  const [resourceId, setResourceId] = useState<number>();
  const [resourceItem, setResourceItem] = useState<CompositeRead>();
  const [fields, setFields] = useState<FeatureLayerFieldRead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const reload = useCallback(async () => {
    if (resource === undefined || resource === null) {
      setResourceId(undefined);
      setResourceItem(undefined);
      setFields([]);
      return;
    }
    // Let the first StrictMode mount/unmount cycle finish before creating AbortController
    await Promise.resolve();

    requestIdRef.current += 1;
    const requestId = requestIdRef.current;

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const resourceResp = await connector.getResourceOrFail(resource, {
        cache,
        signal: controller.signal,
      });

      if (requestId !== requestIdRef.current || controller.signal.aborted) {
        return;
      }

      setResourceId(resourceResp.resource.id);
      setResourceItem(resourceResp);
      setFields(
        resourceResp.feature_layer ? resourceResp.feature_layer.fields : [],
      );
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') {
        return;
      }

      if (requestId !== requestIdRef.current) {
        return;
      }

      setError(err);
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [cache, connector, resource]);

  useEffect(() => {
    reload();

    return () => {
      abortRef.current?.abort();
    };
  }, [reload]);

  const getItems = useCallback(
    async (params: Omit<FetchNgwItemsOptions, 'resourceId' | 'connector'>) => {
      if (!resourceId) {
        return [];
      }

      const itemOptions: FetchNgwItemsOptions = {
        resourceId,
        connector,
        limit: 100,
        geom: false,
        cache,
        ...params,
      };

      return fetchNgwLayerItemsRequest(itemOptions);
    },
    [cache, connector, resourceId],
  );

  const getFieldValues = useCallback(
    async (params: GetFieldValuesOptions) => {
      const {
        field,
        filters,
        limit = 1000,
        cache: requestCache = cache,
        includeEmpty = false,
      } = params;

      const items = await getItems({
        fields: [field],
        filters,
        limit,
        geom: false,
        cache: requestCache,
      });

      const values = items
        .map((item) => item.fields?.[field])
        .filter((value) => {
          if (includeEmpty) {
            return true;
          }
          return value !== null && value !== undefined && value !== '';
        });

      return Array.from(new Set(values)).sort((a, b) =>
        String(a).localeCompare(String(b), 'ru'),
      );
    },
    [cache, getItems],
  );

  const fieldMap = useMemo(() => {
    return Object.fromEntries(fields.map((field) => [field.keyname, field]));
  }, [fields]);

  return {
    connector,
    resourceId,
    resourceItem,
    fields,
    fieldMap,
    loading,
    error,
    reload,
    getItems,
    getFieldValues,
  };
}
