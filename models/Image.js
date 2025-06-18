const db = require('../db');

const ImageModel = {
  async addImage(dreamId, url) {
    const countResult = await db.query(
      'SELECT COUNT(*) FROM images WHERE dream_id = $1',
      [dreamId]
    );
    const count = Number(countResult.rows[0].count);
    if (count >= 4) {
      throw new Error('Only 4 images per one dream');
    }

    const result = await db.query(
      'INSERT INTO images (dream_id, url) VALUES ($1, $2) RETURNING *',
      [dreamId, url]
    );
    return result.rows[0];
  },

  async deleteLastImageByDreamId(dreamId) {
    const result = await db.query(
      'SELECT id FROM images WHERE dream_id = $1 ORDER BY created_at DESC, id DESC LIMIT 1',
      [dreamId]
    );
    if (!result.rows[0]) {
      throw new Error('No images to delete');
    }
    const imageId = result.rows[0].id;
    await db.query('DELETE FROM images WHERE id = $1', [imageId]);
    return imageId;
  },

   async getImagesByDreamId(dreamId) {
    const result = await db.query(
      'SELECT url FROM images WHERE dream_id = $1 ORDER BY created_at ASC, id ASC',
      [dreamId]
    );
    return result.rows;
  },
};



module.exports = ImageModel;