import chalk from 'chalk';
import { Connection } from "@nextgis/ngw-orm";
import Plot from "./Model";

const baseUrl = "https://sandbox.nextgis.com";

async function sync() {
  const connection = await Connection.connect({
    baseUrl,
    auth: {
      login: "administrator",
      password: "demodemo",
    },
  });
  const [resource, created] = await connection.getOrCreateResource(Plot, {
    parent: 0,
  });
  const resUrl = `${baseUrl}/resource/${resource.item?.resource.id}`;
  if (created) {
    console.log(`New resource created ${resUrl}`);
  } else {
    console.log(`Resource already exist ${resUrl}`);

    const validate = resource.validate();
    let needUpdate = false;
    validate.forEach((x) => {
      console.log(`  ${chalk.bgRed(x.type)}: ${chalk.red(x.message)}`);
      if (x.type === "field-not-exist") {
        needUpdate = true;
      }
    });
    if (needUpdate) {
      try {
        await await connection.updateResource(resource);
        console.log(chalk.green("  resource updated"));
      } catch (er) {
        console.log(chalk.red(`  failed to update resource - ${er}`));
      }
    }
  }
}

sync();
