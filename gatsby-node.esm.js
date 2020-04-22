import app from "./src/firebase";
const path = require("path");

exports.sourceNodes = async ({
                                 actions,
                                 createNodeId,
                                 createContentDigest
                             }) => {

    const { createNode } = actions;

    const flattenTranslations = (obj, parents = []) => {
        if (typeof obj !== 'object') {
            return []
        }
        return Object.entries(obj)
            .flatMap(([currentItemName, value]) => {
                if (typeof value !== 'object' && currentItemName === "urlImage") {
                    return [
                        obj
                    ]
                }
                return flattenTranslations(value, parents.concat(currentItemName))
            })
    };

    const fetchDataFirebase =  await app.database().ref("/pagesPicturesData").once("value")
        .then(snapshot => {
            return flattenTranslations(snapshot.val());
        });


    for (const result of fetchDataFirebase) {
        const nodeId = createNodeId(`${result.uid}`);
        const nodeContent = JSON.stringify(result);
        const node = Object.assign({}, result, {
            id: nodeId ,
            originalId: result.uid,
            parent: result.uid,
            children: [],
            page: result.page,
            title: result.title,
            type:result.type,
            internal: {
                type: "firebaseData",
                content: nodeContent,
                contentDigest: createContentDigest(result)
            }
        });
        createNode(node);
    }
};

exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        firebaseData: {
            type: {
                resolve: source => {
                    return source.type
                }
            },
            page: {
                resolve: source => {
                    return source.page
                }
            },
            name: {
                resolve: source => {
                    return source.name
                }
            },
            urlImage: {
                resolve: source => {
                    return source.urlImage
                }
            },
            articleTitle: {
                resolve: source => {
                    return source.articleTitle
                }
            },
            location: {
                resolve: source => {
                    return source.location
                }
            },
            content: {
                resolve: source => {
                    return source.content
                }
            },
            uid: {
                resolve: source => {
                    return source.uid
                }
            },
        }
    };
    createResolvers(resolvers);
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type firebaseData implements Node {
      type: String!
      page: String!
      name: String
      urlImage: String!
      articleTitle: String!
      location: String!
      content: String!
      uid: String!
    }
  `;
    createTypes(typeDefs);
};


exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const firebaseData = await graphql(`
    query {
        allFirebaseData {
            distinct(field: page)
        } 
    }
  `);

    firebaseData.data.allFirebaseData.distinct.forEach(namePage => {
        createPage({
            path: namePage,
            component: path.resolve("./src/templates/article.js"),
            context: {
                page: namePage
            }
        });
    });
};
