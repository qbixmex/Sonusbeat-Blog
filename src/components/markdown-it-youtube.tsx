import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mts";
import type StateCore from "markdown-it/lib/rules_core/state_core.mts";

const youtubeRegex = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;

const markdownItYoutube = (md: MarkdownIt) => {
  md.core.ruler.push("youtube_embed", (state: StateCore) => {
    state.tokens.forEach((blockToken: Token) => {
      if (blockToken.type !== "inline" || !blockToken.children) return;
      blockToken.children.forEach((token: Token) => {
        if (token.type === "text") {
          const match = token.content.match(youtubeRegex);
          if (match) {
            const videoId = match[1];
            token.type = "html_inline";
            token.content = `
              <div class="youtube-responsive">
                <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="YouTube video"></iframe>
              </div>
            `;
          }
        }
      });
    });
  });
};

export default markdownItYoutube;
