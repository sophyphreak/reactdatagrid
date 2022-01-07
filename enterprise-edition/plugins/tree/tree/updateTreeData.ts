/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the Commercial License found in the
 * LICENSE file in the root directory of this source tree.
 */

const EMPTY_OBJECT: object = {};

const updateTreeData = (
  props: any,
  {
    selectedPath,
    destinationPath,
    dragIndex,
    dropIndex,
  }: {
    selectedPath: string;
    destinationPath: string;
    dragIndex: number;
    dropIndex: number;
  }
) => {
  const originalData = props.originalData || [];

  const config = {
    idProperty: props.idProperty,
    nodesName: props.nodesProperty,
    pathSeparator: props.nodePathSeparator,
    expandedNodes: props.computedExpandedNodes,
    generateIdFromPath: props.generateIdFromPath,
    selectedPath,
    destinationPath,
    dragIndex,
    dropIndex,
  };

  computeTreeData(originalData, config);
};

const computeTreeData = (dataArray: any, config: any = EMPTY_OBJECT) => {
  const idProperty = config.idProperty;
  const nodesName = config.nodesName;
  const pathSeparator = config.pathSeparator;
  const expandedNodes = config.expandedNodes;
  const generateIdFromPath = config.generateIdFromPath;
  const selectedPath = config.selectedPath;
  const destinationPath = config.destinationPath;

  let value: any = [];

  const computeData = (
    data: any,
    idSelected: string,
    destinationId: string,
    result: any = [],
    parentNode?: any
  ) => {
    let initialIdSelected: string = '';

    data.forEach((item: any, i: number) => {
      if (initialIdSelected === '') {
        initialIdSelected = idSelected;
      }

      const itemId = `${item[idProperty]}`;

      const itemNodes: any = item[nodesName];

      const parentNodeId = parentNode ? `${parentNode[idProperty]}` : undefined;
      const path = parentNode
        ? `${parentNodeId}${pathSeparator}${item[idProperty]}`
        : `${item[idProperty]}`;

      if (generateIdFromPath) {
        item[idProperty] = path;
      }

      if (parentNode === undefined) {
        result.push(item);
      } else {
        const parentNodes = parentNode[nodesName];
        if (path === initialIdSelected) {
          value.push(item);
          parentNodes.splice(i, 1);
          let normalizedId: string = '';
          for (let j = 1; j <= parentNodes.length; j++) {
            const parsedId = item[idProperty].split(pathSeparator);
            parsedId.splice(parsedId.length - 1, 1);
            parsedId.push(j);

            normalizedId = parsedId.join(pathSeparator);
            parentNodes[j - 1][idProperty] = normalizedId;
          }
        }

        if (path === destinationId) {
          const nodeId = item[idProperty].split(pathSeparator);
          const idInNodes = nodeId.splice(nodeId.length - 1, 1);

          const index = parseInt(idInNodes);
          parentNodes.splice(index, 0, value[0]);

          let normalizedId: string = '';
          let idLength = -1;
          for (let j = 0; j < parentNodes.length; j++) {
            let parsedId: any = [];
            parsedId = [].concat(nodeId);
            parsedId.push(j + 1);

            normalizedId = parsedId.join(pathSeparator);
            if (idLength === -1) {
              idLength = normalizedId.length;
            }

            parentNodes[j][idProperty] = null;
            if (idLength === normalizedId.length) {
              parentNodes[j][idProperty] = normalizedId;
            }
          }
        }
      }

      if (expandedNodes[itemId]) {
        if (Array.isArray(itemNodes)) {
          computeData(itemNodes, idSelected, destinationId, result, item);
        }
      }
    });

    return result;
  };

  const dataArr = [].concat(dataArray);

  const computedData = computeData(dataArr, selectedPath, destinationPath);

  return computedData;
};

export default updateTreeData;
