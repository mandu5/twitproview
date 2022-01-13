import "../App.css";

export function Homepage() {
  return (
    <>
      <div id="app-root">
        <div></div>
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
            <form className="PublishHeader-query">
              <h1 className="WidgetQuery-prompt">Twitter Profile Viewer</h1>
              <section className="WidgetQuery-main">
                <label className="u-hiddenVisually">Enter a Twitter URL</label>
                <input
                  id="configuration-query"
                  className="WidgetQuery-input"
                  placeholder="Enter a Twitter URL"
                />
                <button
                  type="button"
                  className="WidgetQuery-button WidgetQuery-showSuggestions Icon Icon--chevronDown"
                >
                  <span className="u-hiddenVisually">Show Suggestions</span>
                </button>
              </section>
            </form>
          </div>
        </header>
      </div>
      <div className="section full-height over-hide">
        <div className="title">
          <h1>d</h1>
        </div>
      </div>
    </>
  );
}
