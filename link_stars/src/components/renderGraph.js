import CytoscapeComponent from "react-cytoscapejs";
import React from "react";

export default class GraphRender extends React.Component {
  render() {
    const formattedGraph = this.props.elements;
    const layout = {
      name: "circle",
    };

    const elements = formattedGraph;
    return (
      <CytoscapeComponent
        elements={elements}
        style={{
          width: "100%",
          height: "1100px",
          animation: "reverse",
        }}
        layout={layout}
      />
    );
  }
}
