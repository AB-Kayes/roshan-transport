import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "page",
        label: "Page",
        path: "content/pages",
        format: "md",
        ui: {
          router: (props) => {
            if(props.document._sys.relativePath == "home.md") return "/"
            else if(props.document._sys.relativePath == "transport.md") return "/services/transport"
            else if(props.document._sys.relativePath == "cleaning.md") return "/services/cleaning"
            else if(props.document._sys.relativePath == "lawnmowing.md") return "/services/lawn-mowing"
            else if(props.document._sys.relativePath == "booking.md") return "/booking"
            else if(props.document._sys.relativePath == "contact.md") return "/contact"
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title"
          },
          {
            name: "blocks",
            label: "Blocks",
            type: "object",
            list: true,
            templates: [
              {
                name: "hero",
                label: "Hero",
                ui: {
                  itemProps: (item) => {
                    return { label: item.label }
                  }
                },
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                    options: ["Hero", "About", "Call to Action", "Feature"],
                  },
                  {
                    name: "message",
                    label: "Message",
                    type: "rich-text",
                  },
                  {
                    name:"background",
                    label: "Background Image",
                    type: "image",
                  },
                  {
                    name: "links",
                    label: "Links",
                    type: "object",
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item.label }
                      },
                      defaultItem: {
                        label: "new link",
                        link: "/"
                      },
                    },
                    fields: [
                      {type: "string", name: "label", label: "Label"},
                      {type: "string", name: "link", label: "Link"},
                      {
                        type: "string",
                        name: "style",
                        label: "Style",
                        options: ["cta-button", "secondary-button","negative-button"],
                      }
                    ]
                  }
                ]
              },
              {
              name: "feature",
              label: "Feature",
              ui: {
                itemProps: (item) => {
                  return { label: item.label }
                }
              },
              fields: [
                {
                  type: "string",
                  name: "label",
                  label: "Label",
                  options: ["Feature4", "Feature3", "Feature2", "Feature"],
                },
                {
                  name: "message",
                  label: "Message",
                  type: "rich-text",
                },
                {
                  name: "cards",
                  label: "Cards",
                  type: "object",
                  list: true,
                  ui: {
                    itemProps: (item) => {
                      return { label: item.label }
                    },
                    defaultItem: {
                      icon: "shield",
                      label: "new card",
                      description: "This is a new card",
                    },
                  },
                  fields: [
                    {
                      type: "string",
                      name: "icon",
                      label: "Icon",},
                    { type: "string", name: "label", label: "Label" },
                    {
                      type: "string",
                      name: "description",
                      label: "Description",
                      ui: {
                        component: "textarea",
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: "serivces",
              label: "Services",
              fields: [
                {
                  name: "message",
                  label: "Message",
                  type: "rich-text",
                },
                {
                  name: "card",
                  label: "Card",
                  type: "object",
                  list: true,
                  ui: {
                    itemProps: (item) => {
                      return { label: item.label }
                    }
                  },
                  fields: [
                    {
                      type: "string",
                      name: "label",
                      label: "Label"
                    },
                    {
                      name: "message",
                      label: "Message",
                      type: "string",
                    },                    
                    {
                      type: "rich-text",
                      name: "points",
                      label: "Points"
                    },
                    {
                      name:"background",
                      label: "Background Image",
                      type: "image",
                    },
                    {
                      name: "links",
                      label: "Links",
                      type: "string"
                    }
                  ]
                },                
              ],
            },
            {
              name: "contact",
              label: "Contact",
              fields: [
                {
                  name: "message",
                  label: "Message",
                  type: "rich-text",
                },
                {
                  name: "email",
                  label: "Email",
                  type: "string",
                },
                {
                  name: "phone",
                  label: "Phone",
                  type: "string",
                },
                {
                  name: "address",
                  label: "Address",
                  type: "rich-text",
                },
                {
                  name: "hours",
                  label: "Hours",
                  type: "rich-text"
                }
              ]
            }
            ]
          }
        ]
      },
      {
        name: "nav",
        label: "Nav",
        path: "content/nav",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          global: true,
        },
        fields: [
          {name: "logo", label: "Logo", type: "image"},
          {name: "phone", label: "Phone", type: "string"},
        ]
      },
      {
        name: "footer",
        label: "Footer",
        path: "content/footer",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          global: true,
        },
        fields: [
          {name: "message", label: "Message", type: "rich-text"},
          {name: "phone", label: "Phone", type: "string"},
          {name: "email", label: "Email", type: "string"},
          {name: "address", label: "Address", type: "string"},
        ]
      }
    ],
  },
});
