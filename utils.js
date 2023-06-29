import client from "./config/weaviateClient.js";
import imageSchema from "./models/weaviateSchema.js";
import { readdirSync, readFileSync, writeFileSync } from "fs";

// Claim.paginate(query, options, function (err, result) {
//     if (err) {
//       console.log(err);
//       return res.status(400).send(err);
//     }

//     result.filter = filter;

//     res.status(200).send(result);
// });

export const storeAllImages = async (req, res) => {
    try {
        const imgFiles = readdirSync("./images");

        const promises = imgFiles.map(async (file) => {

            const b64 = Buffer.from(`./images/${file}`).toString('base64');

            await client.data.creator()
                .withClassName("Image")
                .withProperties({
                    image: b64,
                    text: file.split(".")[0].split("_").join(" ")
                })
                .do();
        });

        await Promise.all(promises);

        res.status(200).send("Images were stored");

    } catch (err) {
        console.error(err)
        res.status(400).send("There was an error");
    }
}

export const storeImage = async (req, res) => {
    try {

        const img = readFileSync("./images/shirt.png");

        const b64 = Buffer.from(img).toString("base64");

        await client.data.creator()
            .withClassName("Image")
            .withProperties({
                image: b64,
                text: "clothes"
            })
            .do();

        res.status(200).send("Image was stored");

    } catch (err) {
        console.error(err)
        res.status(400).send("There was an error");
    }
}

export const returnImage =  async (req, res) => {
    const test = Buffer.from( readFileSync("./images/ad.png") ).toString("base64");

    const resImage = await client.graphql.get()
        .withClassName("Image")
        .withFields(["image"])
        .withNearImage({ image: test })
        .withLimit(1)
        .do();

    // Write result to filesystem
    const result = resImage.data.Get.Image[0].image;
    writeFileSync("./images/result.png", result, "base64");

    res.status(200).send(result);
}

export const createImageSchema =  async (req, res) => {

    // const schemaExists = await client.schema.getter().do();

    // if (!schemaExists) {
    //     await client.schema
    //         .classCreator()
    //         .withClass(imageSchema)
    //         .do();
    // } else {
    //     console.log("Schema exists: ", schemaExists);
    //     res.status(403).send("Schema already exists");
    // }

    await client.schema
        .classCreator()
        .withClass(imageSchema)
        .do();
}