import { Request, Response } from 'express';
import { fetchDynamicData } from '../services/fetchService';

export async function getFetchData(req: Request, res: Response): Promise<void> {
  const { query } = req.params;

  if (!query) {
    res.status(400).json({
      status: 'error',
      message: 'Query parameter is required.',
    });
    return;
  }

  try {
    const data = await fetchDynamicData(query);
    if (data) {
      res.status(200).json({
        status: 'success',
        query,
        data,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'No data found for the given query.',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
      error: (error as Error).message,
    });
  }
}
