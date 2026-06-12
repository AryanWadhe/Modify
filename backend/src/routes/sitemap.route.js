import { Router } from "express";
import { Album } from "../models/album.model.js";

const router = Router();

router.get("/", async (req, res) => {
	try {
		const albums = await Album.find({}, "_id updatedAt");

		const urls = albums
			.map(
				(album) => `
	<url>
		<loc>https://modify.online/albums/${album._id}</loc>
		<lastmod>${album.updatedAt.toISOString()}</lastmod>
	</url>`
			)
			.join("");

		const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

	<url>
		<loc>https://modify.online/</loc>
	</url>

	${urls}

</urlset>`;

		res.header("Content-Type", "application/xml");
		res.send(xml);
	} catch (error) {
		res.status(500).send("Error generating sitemap");
	}
});

export default router;