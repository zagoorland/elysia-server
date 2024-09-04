import { Elysia, t } from "elysia";
import movies from "./movies.json";
import { SeriesItemDto } from "./types";
import swagger from "@elysiajs/swagger";

const port = 8080;

const series: SeriesItemDto[] = [
  {
    id: 1,
    title: "Stranger Things",
    seasons: [
      {
        id: 1,
        title: "Season 1",
        episodes: [
          {
            id: "st_s01e01",
            title: "Chapter One: The Vanishing of Will Byers",
            description:
              "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
            duration: 49,
            end: new Date("2016-07-15T00:49:00Z"),
            imageUrl: "https://example.com/stranger-things-s01e01.jpg",
            playUrl: "https://example.com/play/stranger-things-s01e01",
            posterImg: "https://example.com/stranger-things-s01e01-poster.jpg",
            progress: 0,
            publishDate: new Date("2016-07-15T00:00:00Z"),
            start: new Date("2016-07-15T00:00:00Z"),
            subTitle: "The Vanishing of Will Byers",
            tags: ["sci-fi", "horror", "drama"],
          },
          // Add more episodes here...
        ],
      },
      // Add more seasons here...
    ],
  },
  // Add more series here...
];

const app = new Elysia().use(swagger());

app
  .get("/", () => ({ message: "Use /movies or /series to get started" }))
  .get("/movies", () => movies)
  .get("/series", () => series)
  .get(
    "/movies/:id",
    ({ params: { id } }) => {
      const movie = movies.find((m) => m.id === id);
      return movie ?? { error: "Movie not found" };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .get(
    "/series/:seriesId",
    ({ params: { seriesId } }) => {
      const seriesItem = series.find((s) => s.id === seriesId);
      return seriesItem ?? { error: "Series not found" };
    },
    {
      params: t.Object({
        seriesId: t.Numeric(),
      }),
    }
  )
  .get(
    "/series/:seriesId/seasons/:seasonId/episodes/:episodeId",
    ({ params: { seriesId, seasonId, episodeId } }) => {
      const seriesItem = series.find((s) => s.id === seriesId);
      if (!seriesItem) return { error: "Series not found" };

      const season = seriesItem.seasons.find((s) => s.id === seasonId);
      if (!season) return { error: "Season not found" };

      const episode = season.episodes.find((e) => e.id === episodeId);
      return episode ?? { error: "Episode not found" };
    },
    {
      params: t.Object({
        seriesId: t.Numeric(),
        seasonId: t.Numeric(),
        episodeId: t.String(),
      }),
    }
  )
  .get(
    "/movies/search",
    ({ query: { q } }) => {
      const searchResults = movies.filter((m) =>
        m.title.toLowerCase().includes(q.toLowerCase())
      );
      return searchResults;
    },
    {
      query: t.Object({
        q: t.String(),
      }),
    }
  );

app.listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
