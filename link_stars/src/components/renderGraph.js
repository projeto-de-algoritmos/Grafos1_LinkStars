import CytoscapeComponent from "react-cytoscapejs";
import React from "react";

export default class GraphRender extends React.Component {
  render() {
    const formattedGraph = this.props.elements;
    const layout = {
      name: "circle",
    };
    const { lastXpos } = this.props;

    const elements = formattedGraph;
    return (
      <CytoscapeComponent
        elements={elements}
        style={{
          width: lastXpos,
          height: "700px",
        }}
        layout={layout}
      />
    );
  }
}
