import { pool } from '../index.js';

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const { username, reviewText, rating } = req.body;

  try {
    const query = {
      text: 'INSERT INTO reviews (product_id, username, review_text, rating) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [tourId, username, reviewText, rating],
    };

    const result = await pool.query(query);
    const savedReview = result.rows[0];

    res.status(200).json({
      success: true,
      message: 'Review submitted',
      data: savedReview,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Failed to submit',
    });
  }
};

export const getAllReviews = async (req, res) => {
  const { tourId } = req.params;

  try {
    const query = {
      text: 'SELECT * FROM reviews WHERE product_id = $1',
      values: [tourId],
    };

    const result = await pool.query(query);
    const reviews = result.rows;

    res.status(200).json({
      success: true,
      message: 'Reviews fetched',
      data: reviews,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
    });
  }
};

export const getUserReviews = async (req, res) => {
  const { userId } = req.params;

  try {
    const query = {
      text: 'SELECT * FROM reviews WHERE user_id = $1',
      values: [userId],
    };

    const result = await pool.query(query);
    const reviews = result.rows;

    res.status(200).json({
      success: true,
      message: 'User reviews fetched',
      data: reviews,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user reviews',
    });
  }
};

