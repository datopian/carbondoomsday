import React, { PropTypes } from 'react'
import { Column, Table } from 'react-virtualized'
import 'react-virtualized/styles.css'
const Spinner = require('react-spinkit')

class ReactVirtualized extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.spec.data,
      headers: this.props.spec.headers,
      width: this.props.spec.width,
      height: this.props.spec.height,
      headerHeight: this.props.spec.headerHeight,
      rowHeight: this.props.spec.rowHeight,
      rowCount: this.props.spec.rowCount,
      columnWidth: this.props.spec.columnWidth
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.spec.data,
      rowCount: nextProps.spec.rowCount,
      height: nextProps.spec.height
    })
  }

  render() {
    let columns = []
    this.state.headers.forEach((header, idx) => {
      columns.push(
        <Column
          label={header}
          dataKey={header}
          width={this.state.columnWidth}
          key={idx}
        />
      )
    })
    return (
      <Table
        className="table"
        headerClassName="rv-header"
        width={this.state.width}
        height={this.state.height}
        headerHeight={this.state.headerHeight}
        rowHeight={this.state.rowHeight}
        rowCount={this.state.rowCount}
        rowGetter={({ index }) => this.state.data[index]}
      >
        {columns}
      </Table>
    )
  }

}

export default ReactVirtualized
