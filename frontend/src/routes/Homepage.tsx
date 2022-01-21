import { useSetRecoilState } from "recoil";
import { searchTypedAtom } from "../atom";
import "../App.css";

export function Homepage() {
  const setId = useSetRecoilState(searchTypedAtom);
  const onEnter = (event: any) => {
    if (event.key === "Enter") {
      setId(event.currentTarget.value);
    }
  };
  return (
    <>
      <div id="app-root">
        <header id="top" className="PublishHeader is-shrinkDisabled">
          <div className="PublishHeader-content">
            <div className="u-cf">
              <h1 className="PublishHeader-brand">
                <a className="u-textInheritColor" href="/">
                  <span className="PublishHeader-logo Icon Icon--twitter"></span>
                </a>
              </h1>
              <p className="PublishHeader-helpLink">
                <a
                  className="u-textInheritColor"
                  target="_blank"
                  href="https://developer.twitter.com/en/products/twitter-for-websites"
                  data-ga-category="header"
                  data-ga-action="help"
                  rel="noreferrer"
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
                <input
                  type="text"
                  id="configuration-query"
                  className="WidgetQuery-input"
                  placeholder="Enter a Twitter UserId"
                  onKeyPress={onEnter}
                />
              </section>
            </div>
          </div>
        </header>
      </div>
      <div className="section full-height over-hide"></div>
    </>
  );
}
