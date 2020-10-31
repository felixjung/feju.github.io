import { NextApiRequest, NextApiResponse } from 'next';

export default function previewHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setPreviewData({});

  const { slug } = req.query;

  if (Array.isArray(slug)) {
    // TODO: use HTTP status code enum.
    res.status(400).end();
    return;
  }

  res.redirect(slug);
}
