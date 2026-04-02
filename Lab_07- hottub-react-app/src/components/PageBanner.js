import { Link } from 'react-router-dom';

export default function PageBanner({ title }) {
  return (
    <section className="page-banner">
      <div className="container">
        <h1 className="fade-in">{title}</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
}
