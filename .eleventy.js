module.exports = function (eleventyConfig) {
  // Pass through CSS, images, admin
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  // Date filter for templates
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addFilter("shortMonth", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  });

  eleventyConfig.addFilter("dayOfMonth", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).getDate();
  });

  // Current year shortcode (for footer copyright)
  eleventyConfig.addShortcode("currentYear", () => new Date().getFullYear().toString());

  // Collections
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("events", (api) =>
    api.getFilteredByGlob("src/events/*.md").sort((a, b) => a.date - b.date)
  );

  eleventyConfig.addCollection("tributes", (api) =>
    api.getFilteredByGlob("src/tributes/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
