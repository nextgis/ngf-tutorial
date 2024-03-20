// Import the cli-color library for colored console output
import clc from "cli-color";
import { Connection } from "@nextgis/ngw-orm";
// Import the Plot model, which is a local file defining a data model
import Plot from "./Model";

// Define the base URL for the NGW service
const baseUrl = "https://sandbox.nextgis.com";

// Sync the Plot model with the NGW service
async function sync() {
  // Establish a connection with the NGW service
  const connection = await Connection.connect({
    baseUrl,
    auth: {
      login: "administrator",
      password: "demodemo",
    },
  });

  // Get or create a new resource based on the Plot model
  const [resource, created] = await connection.getOrCreateResource(Plot, {
    parent: 0, // Parent ID for the resource, 0 refers to the root
  });

  // Construct the URL for the resource
  const resUrl = `${baseUrl}/resource/${resource.item?.resource.id}`;

  // Log different messages based on whether the resource was newly created or already existed
  if (created) {
    console.log(clc.green(`New resource created ${resUrl}`));
  } else {
    console.log(clc.yellow(`Resource already exist ${resUrl}`));

    // Validate the resource. This could involve checking for required fields, correct data types, etc.
    const validate = resource.validate();
    let needUpdate = false;
    // Loop through validation results and log any issues
    validate.forEach((x) => {
      console.log(`  ${clc.bgRed(x.type)}: ${clc.red(x.message)}`);
      // Check if there are any fields that don't exist but are needed
      if (x.type === "field-not-exist") {
        needUpdate = true;
      }
    });

    // If updates are needed (based on the validation results), try to update the resource
    if (needUpdate) {
      try {
        await connection.updateResource(resource);
        console.log(clc.green("  resource updated"));
      } catch (er) {
        // Log any errors that occur during the update
        console.log(clc.red(`  failed to update resource - ${er}`));
      }
    }
  }
}

// Call the sync function
sync();
