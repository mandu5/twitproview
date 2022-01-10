import "./App.css";

function App() {
  var request = require("request");
  var options = {
    method: "GET",
    url: "https://api.twitter.com/2/users/2244994945/tweets?max_results=5&tweet.fields=created_at,public_metrics",
    headers: {
      Authorization:
        "Bearer AAAAAAAAAAAAAAAAAAAAAM%2FBXwEAAAAAUjvhf4YRhgTCVJ7q%2BwQDPueQufE%3DtTgvzLO5HTxlyFV7O3spJ5uhSPlf8LTqrEhkiNDwgPR8VZS2kh",
      Cookie:
        'guest_id=v1%3A164179624887409961; guest_id_ads=v1%3A164179624887409961; guest_id_marketing=v1%3A164179624887409961; personalization_id="v1_xACUax4tEk/YTGF18NEjyQ=="',
    },
  };
  request(options, function (error: string | undefined, response: { body: any; }) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  return (
    <body>
      <meta charSet="UTF-8"></meta>
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
          {/* <a className="twitter-timeline" href="https://twitter.com/LaplusDarknesss?ref_src=twsrc%5Etfw"
                data-chrome="nofooter" data-aria-polite="assertive">Tweets by
                LaplusDarknesss</a> */}
        </div>
      </div>
      {/* <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script> */}
      {}
    </body>
  );
}

export default App;
