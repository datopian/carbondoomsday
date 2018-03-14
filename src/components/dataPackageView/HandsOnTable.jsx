import urllib from 'url'

import React, { PropTypes } from 'react'
import Handsontable from 'handsontable'
const Spinner = require('react-spinkit')
import {CopyToClipboard} from 'react-copy-to-clipboard'

class HandsOnTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hot: null
    }
  }

  componentDidMount() {
    // Create and bind Handsontable when the container component triggers update
    let hot = new Handsontable(document.getElementById(`hTable${this.props.idx}`), this.props.spec)
    this.setState({
      hot: hot
    })
  }

  componentWillUpdate(nextProps) {
    // Update Handsontable when new props are received
    if(this.state.hot) {
      this.state.hot.updateSettings(nextProps.spec)
    }
  }

  render() {
    const divId = `hTable${this.props.idx}`
    let baseUrl = window.location.href
    baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'
    const viewPath = `r/${this.props.idx - 1}.html`
    const sharedUrl = urllib.resolve(baseUrl, viewPath)
    const iframe = `<iframe src="${sharedUrl}" width="100%" height="100%" frameborder="0"></iframe>`
    const tracker = `watermark-${baseUrl}`
    return (
      <div>
        { this.props.spec.viewTitle && <h3>{this.props.spec.viewTitle}</h3> }
        <div className="share-and-embed">
          <span className="copy-text">Share:</span>
          <input value={sharedUrl} className="copy-input" />
            <CopyToClipboard text={sharedUrl}
              onCopy={() => console.log('Copied to clipboard')}>
              <button className="copy-button">Copy</button>
            </CopyToClipboard>

          <span className="copy-text">Embed:</span>
          <input value={iframe} className="copy-input" />
          <CopyToClipboard text={iframe}
            onCopy={() => console.log('Copied to clipboard')}>
            <button className="copy-button">Copy</button>
          </CopyToClipboard>
        </div>
        <div id={divId} className="handsontable">
          { !this.props.spec.data && <Spinner spinnerName="rotating-plane"/> }
        </div>
        <div className="datahub-meta">
          <span className="meta-text">Powered by ❒ </span>
          <a className="datahub-home" href="https://datahub.io" onClick={() => {
              trackOutboundLink(tracker)
            }}
            target="_blank">DataHub
          </a>
        </div>
      </div>
    )
  }
}
// HandsOnTable.propTypes = {
//   idx: PropTypes.string.required,
//   spec: PropTypes.object
// };

export default HandsOnTable
