import PurgeFromJS from './index';

describe('PurgeFromJS', () => {
    const mockContent = `import { VNode, VNodeProperties } from "maquette";
    import { $, $$ } from "../base-styles";

    /**
     * Panel
     * @param nodes
     */
    export const Panel = (isHoriz?: boolean,
                          title?: string,
                          properties?: VNodeProperties,
                          ...nodes: Array<string | VNode>): VNode => {
      let node = $.div.panel.bgWhite.shadow.smP1.p3.my2.rounded.leftAlign.overflowAuto;
      const titleNode = $.div.h2.pb2.h([title || ""]);
      if (isHoriz) {
        if (title && title.length) {
          return node.leftAlign.h([
            titleNode,
            $.div.flex.alignMiddle.justifyCenter.h(nodes),
          ]);
        } else {
          node = node.flex.alignMiddle.justifyCenter;
        }
      }
      if (title) {
        nodes = [titleNode, ...nodes];
      }
      return node.h(properties, nodes);
    };
    `;

    it('contains all the selectors', () => {
        const expected = ["div", "panel", "bg-white", "shadow", "sm-p1", "p3", "my2", "rounded", "left-align", "overflow-auto", "div", "h2", "pb2", "h-title", "flex", "align-middle", "justify-center"]
        const selectors = PurgeFromJS.extract(mockContent);
        expect(expected.every(x => selectors.includes(x))).toBe(true);
    });
});
