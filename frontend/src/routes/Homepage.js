import { useSetRecoilState } from "recoil";
import { searchTypedAtom } from "../atom";
import "../App.css";

export function Homepage() {
  const setId = useSetRecoilState(searchTypedAtom);
  return (
    <>
      <div id="app-root">
        <header id="top" className="PublishHeader is-shrinkDisabled">
          <div className="PublishHeader-content">
            <div className="u-cf">
              <h1 className="PublishHeader-brand">
                <a className="u-textInheritColor" href="/">
                  <span className="PublishHeader-logo Icon Icon--twitter"></span>
                  <span className="u-hiddenVisually">Twitter</span>
                </a>
              </h1>
              <p className="PublishHeader-helpLink">
                <a
                  className="u-textInheritColor"
                  target="_blank"
                  href="https://developer.twitter.com/en/products/twitter-for-websites"
                  data-ga-category="header"
                  data-ga-action="help"
                >
                  <span className="PublishHeader-helpLinkLongCopy">
                    Curate a story with Twitter
                  </span>
                  <span className="PublishHeader-helpLinkShortCopy">
                    Curate a story
                  </span>
                </a>
              </p>
            </div>
            <div className="PublishHeader-query">
              <h1 className="WidgetQuery-prompt">Twitter Profile Viewer</h1>
              <section className="WidgetQuery-main">
                <label className="u-hiddenVisually">Enter a Twitter URL</label>
                <input
                  id="configuration-query"
                  className="WidgetQuery-input"
                  placeholder="Enter a Twitter URL"
        
                  onKeyDown={(e) => setId(e.target.value)}
                />
                <button
                  type="button"
                  className="WidgetQuery-button WidgetQuery-showSuggestions Icon Icon--chevronDown"
                >
                  <span className="u-hiddenVisually">Show Suggestions</span>
                </button>
              </section>
            </div>
          </div>
        </header>
      </div>
      <div className="section full-height over-hide"></div>
    </>
  );
}
