import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Tour.css';

export default function Tour() {
  const { id } = useParams();
  const location = useLocation();
  const passedTour = location.state?.tourData || null;

  const [tour, setTour] = useState(passedTour);
  const [loading, setLoading] = useState(!passedTour);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  useEffect(() => {
    if (passedTour) {
      console.log('Используем данные тура из location.state:', passedTour);
      setLoading(false);
      return;
    }

    if (!id) {
      console.warn('ID тура отсутствует, запрос не будет выполнен');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/api/tours/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
        return res.json();
      })
      .then(data => {
        let description = data.description;

        if (typeof description === 'string') {
          try {
            description = JSON.parse(description);
          } catch (e) {
            console.warn('Не удалось распарсить описание как JSON:', e);
          }
        }

        setTour({ ...data, description });
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки тура:', err);
        setLoading(false);
      });
  }, [id, passedTour]);

  if (loading) return <div className="loading">Загрузка данных тура...</div>;
  if (!tour) return <div className="error">Тур не найден</div>;

  return (
    <div className="tour-page">
      {/* Основное изображение */}
      <div className="tour-hero">
        <img src={tour.mainImage} alt={tour.title} className="hero-image" />
        <div className="tour-overlay">
          <h1>{tour.title}</h1>
          <div className="tour-meta">
            <span>{tour.duration}</span>
            <span>{tour.price}</span>
          </div>
        </div>
      </div>

      {/* Кнопка бронирования */}
      <div className="book-now-container">
        <Link to={`/booking/${id}`} className="book-now-btn">
          Забронировать тур
        </Link>
      </div>

      {/* Описание тура */}
      {tour.description && (
        <section className="tour-section">
          <h2>Описание</h2>
          {Array.isArray(tour.description) ? (
            tour.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : typeof tour.description === 'object' ? (
            <p>{tour.description.full || tour.description.short}</p>
          ) : (
            <p>{tour.description}</p>
          )}
        </section>
      )}

      {/* Программа тура */}
      {tour.itinerary && tour.itinerary.length > 0 && (
        <section className="tour-section">
          <h2>Программа тура</h2>
          {tour.itinerary.map((item, index) => (
            <div key={index} className="itinerary-day">
              <h3>День {item.day}: {item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Галерея */}
      {tour.gallery && tour.gallery.length > 0 && (
        <section className="tour-section">
          <h2>Фотогалерея</h2>
          <Slider {...sliderSettings}>
            {tour.gallery.map((img, index) => (
              <div key={index} className="gallery-slide">
                <img src={img} alt={`Фото ${index + 1}`} className="gallery-image" />
              </div>
            ))}
          </Slider>
        </section>
      )}
    </div>
  );
}
