const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, ''); // Извлекаем токен из заголовка авторизации Вынимаем из запроса токен эт спецыальная фукнция для проверки auth, а в конце прописываем удаление bearer которое добавляет нам проверялка
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //Декодируем с помощю секрета

            req.userId = decoded.id; 
            next(); // Если всё норм то  функция выдаёт ответ(вернее продолжаеться)
        } catch (error) {
            console.log('Error decoding token:', error);
            return res.status(400).json({ message: 'No access' });
        }
    } else {
        return res.status(403).json({
            message: 'No access',
        });
    }
};