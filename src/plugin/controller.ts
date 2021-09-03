figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'assign-content') {
      const currentSelections = figma.currentPage.selection
      if (currentSelections.length <= 0) return

      for (const node of figma.currentPage.selection) {
          if (node.type === 'TEXT') {
            // @ts-ignore
            await figma.loadFontAsync(node.fontName)

            node.characters = msg.content
          }
      }
    }

    // figma.closePlugin();
};
