import urllib from 'url'

import React, { PropTypes } from 'react'
import Handsontable from 'handsontable'
const Spinner = require('react-spinkit')
import {CopyToClipboard} from 'react-copy-to-clipboard'
import ReactHover from 'react-hover'

class HandsOnTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hot: null,
      hoverText: 'Copy to clipboard'
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

  copied() {
    this.setState({
      hoverText: 'Copied!'
    })
    setTimeout(() => {
      this.setState({
        hoverText: 'Copy to clipboard'
      })
    }, 1500)
  }

  render() {
    const divId = `hTable${this.props.idx}`
    const windowHref = window.location.href
    const windowHrefParts = urllib.parse(windowHref)
    const baseUrl = windowHrefParts.protocol + '//' + windowHrefParts.host
      + windowHrefParts.path.split('/').slice(0,3).join('/') + '/'
    const viewPath = `r/${this.props.idx - 1}.html`
    let sharedUrl = urllib.resolve(baseUrl, viewPath)
    // If base url is a full URL (with /v/ revision number) then convert it to params:
    if (windowHref.match(/\/[^/]+\/[^/]+\/v\/[0-9]+/)) {
      const revision = parseInt(windowHrefParts.path.split('/')[4])
      sharedUrl += `?v=${revision}`
    }
    const iframe = `<iframe src="${sharedUrl}" width="100%" height="100%" frameborder="0"></iframe>`
    const tracker = `watermark-${baseUrl}`
    const homePagePath = `https://datahub.io?source=${tracker}`
    const optionsCursorTrueWithMargin = {
      followCursor: true,
      shiftX: -5,
      shiftY: 20
    }

    return (
      <div>
        { this.props.spec.viewTitle && <h3>{this.props.spec.viewTitle}</h3> }
        <div className="share-and-embed">

          <span className="copy-text">Share:</span>
          <input value={sharedUrl} className="copy-input" />
          <ReactHover options={optionsCursorTrueWithMargin}>
            <ReactHover.Trigger type='trigger'>
              <CopyToClipboard text={sharedUrl}
                onCopy={() => this.copied()}>
                  <button className={'copy-button trigger shared-' + sharedUrl}>
                    <i className={'fa fa-clipboard trigger shared-' + sharedUrl} aria-hidden="true"></i>
                  </button>
              </CopyToClipboard>
            </ReactHover.Trigger>
            <ReactHover.Hover type='hover'>
              <span className="hover-text">{this.state.hoverText}</span>
            </ReactHover.Hover>
          </ReactHover>

          <span className="copy-text">Embed:</span>
          <input value={iframe} className="copy-input" />
          <ReactHover options={optionsCursorTrueWithMargin}>
            <ReactHover.Trigger type='trigger'>
              <CopyToClipboard text={iframe}
                onCopy={() => this.copied()}>
                  <button className={'copy-button trigger embed-' + sharedUrl}>
                    <i className={'fa fa-clipboard trigger embed-' + sharedUrl} aria-hidden="true"></i>
                  </button>
              </CopyToClipboard>
            </ReactHover.Trigger>
            <ReactHover.Hover type='hover'>
              <span className="hover-text">{this.state.hoverText}</span>
            </ReactHover.Hover>
          </ReactHover>

        </div>
        <div id={divId} className="handsontable">
          { !this.props.spec.data && <Spinner spinnerName="rotating-plane"/> }
        </div>
        <div className="datahub-meta">
          <span className="meta-text">Powered by ❒ </span>
          <a className="datahub-home" href={homePagePath} target="_blank">
            DataHub
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
