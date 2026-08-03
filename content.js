/* =========================================================================
   CONTENT.JS
   -------------------------------------------------------------------------
   Everything you'll want to update on a day-to-day basis lives in this
   file: skills, projects and contact links. The design/layout code lives
   in script.js and style.css — you shouldn't need to touch those.

   HOW TO ADD A PROJECT
   -------------------------------------------------------------------------
   Copy the sample object inside PROJECTS, paste it as a new entry, and
   fill in your own details. Delete the sample once you have real projects.

   {
     title: "Project title",
     image: "assets/projects/your-image.png",   // dashboard/report screenshot
     tools: ["Power BI", "SQL"],                  // tools used
     description: "1-3 sentences on what the project is and why you built it.",
     insights: [
       "A key takeaway or finding from the analysis.",
       "Another takeaway (optional)."
     ],
     github: "https://github.com/your-username/your-repo",  // or "" to hide
     live: "https://your-dashboard-link.com",                // or "" to hide
     featured: true   // true = larger, visually prominent card (use for Power BI work)
   }
   ========================================================================= */

const PROFILE = {
  name: "Niran Adhikari",
  role: "Aspiring Data Analyst",
  email: "your.email@example.com",          // TODO: replace with your real email
  linkedin: "https://linkedin.com/in/your-profile", // TODO: replace
  github: "https://github.com/your-username"        // TODO: replace
};

const SKILLS = [

  {
    name: "SQL",
    blurb: "Writing efficient queries to clean, join, filter, and analyze relational data.",
    icon: "sql"
  },
  {
    name: "Excel",
    blurb: "Using formulas, PivotTables, charts, and data cleaning techniques for analysis.",
    icon: "excel"
  },

   {
    name: "Power BI",
    blurb: "Creating interactive dashboards and reports that turn data into clear, actionable insights.",
    icon: "powerbi"
  },
  
  {
    name: "Python",
    blurb: "Analyzing, cleaning, and visualizing data using Python, Pandas, Matplotlib, and Seaborn.",
    icon: "python"
  }
];

/* -------------------------------------------------------------------------
   PROJECTS
   The single entry below is a TEMPLATE showing the expected format and
   card layout — it is not a real project. Replace it with your own work.
   Cards with featured: true (and/or "Power BI" in tools) are shown larger.
------------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "Sales Analytics",
    image: "",
    tools: ["Power BI", "SQL"],
    description:
      "  ",
    insights: [
      // "Replace with a real, specific takeaway from your analysis.",
      // "Add a second takeaway if you have one."
    ],
    github: "",
    live: "",
    featured: true,
    isTemplate: true
  }
];

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "nirajan.adhikari.np@gmail.com",
    href: "mailto:" + PROFILE.email,
    icon: "mail"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/nirajan-adhikari10/",
    href: PROFILE.linkedin,
    icon: "linkedin"
  },
  {
    label: "GitHub",
    value: "github.com/niran-adhikari",
    href: PROFILE.github,
    icon: "github"
  }
];
