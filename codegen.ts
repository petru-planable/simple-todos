import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./server/schema.graphql",
  documents: ["imports/ui/*.tsx"],
  generates: {
    "./imports/gql/": {
      preset: "client",
    },
  },
  hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;
