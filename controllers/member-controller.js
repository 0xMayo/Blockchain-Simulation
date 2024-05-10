import { blockchain } from '../startup.js';

export const listMembers = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, statusCode: 200, data: blockchain.memberNodes });
};

export const registerNode = (req, res, next) => {
  const node = req.body;

  if (
    blockchain.memberNodes.indexOf(node.nodeUrl) === -1 &&
    blockchain.nodeUrl !== node.nodeUrl
  ) {
    blockchain.memberNodes.push(node.nodeUrl);
    syncMembers(node.nodeUrl);

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: { message: `Node ${node.nodeUrl} is registered` },
    });
  } else {
    res.status(400).json({
      success: false,
      statusCode: 400,
      data: { message: `Node ${node.nodeUrl} is already registered` },
    });
  }
};

export const syncMembers = async (url) => {
  const members = [...blockchain.memberNodes, blockchain.nodeUrl];
  try {
    const fetchPromises = members.map(member => {
      const body = { nodeUrl: member };
      return fetch(`${url}/api/v1/members/register-node`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    await Promise.all(fetchPromises);
  } catch (error) {
    console.error('Error syncing members:', error);
  }
};