import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

const YOUTUBE_REGEX = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
const YOUTUBE_CLASS = "youtube-responsive";

export const rehypeYoutube = () => {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      // Solo procesa <p> que tengan UN SOLO hijo <a> con un link de YouTube
      if (
        node.tagName === "p" &&
        Array.isArray(node.children) &&
        node.children.length === 1 &&
        (node.children[0] as Element).tagName === "a"
      ) {
        const aNode = node.children[0] as Element;
        const url = aNode.properties && typeof aNode.properties.href === "string" ? aNode.properties.href : "";
        const match = url.match(YOUTUBE_REGEX);
        if (match && parent && typeof index === "number") {
          const videoId = match[1];
          parent.children[index] = {
            type: "element",
            tagName: "div",
            properties: { className: [YOUTUBE_CLASS] },
            children: [
              {
                type: "element",
                tagName: "iframe",
                properties: {
                  src: `https://www.youtube.com/embed/${videoId}`,
                  frameborder: "0",
                  allowfullscreen: true,
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  title: "YouTube video"
                },
                children: [],
              },
            ],
          };
        }
      }
    });
  };
};

export default rehypeYoutube;
