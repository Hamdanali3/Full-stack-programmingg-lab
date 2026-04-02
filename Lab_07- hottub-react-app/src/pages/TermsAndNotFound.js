import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

export function TermsPage() {
  const termsSections = [
    ['Introduction', 'These terms govern use of the HotTub Haven website and purchase of products from our store.'],
    ['Eligibility', 'You must be at least 18 years old to place orders through this website.'],
    ['Products and Pricing', 'All pricing is listed in USD and may change without prior notice based on availability.'],
    ['Orders and Payment', 'We accept Visa, Mastercard, Amex, and PayPal. We reserve the right to refuse fraudulent orders.'],
    ['Shipping and Delivery', 'Free shipping is available on orders over $500 within the continental US. Standard delivery is 5-10 business days.'],
    ['Returns and Refunds', 'Returns are accepted within 30 days for eligible items in original packaging. Refunds process in 7-10 business days.'],
    ['Warranty', 'Shell: 10-year, Plumbing: 5-year, Electrical: 3-year, Cabinet/Cover: 2-year.'],
    ['Intellectual Property', 'All logos, product descriptions, and visual content are protected intellectual property.'],
    ['Limitation of Liability', 'Our maximum liability is limited to the amount paid for the specific order.'],
    ['Privacy Policy', 'By using our website, you also agree to the data handling described in our Privacy Policy.'],
    ['Changes to Terms', 'We may update these terms periodically, and continued use indicates acceptance of updates.'],
    ['Contact Information', 'For legal or policy questions: legal@hottubhaven.com | +1 (800) 555-TUBS'],
  ];

  return (
    <>
      <PageBanner title="Terms and Conditions" />
      <section className="section-padding">
        <div className="container">
          <div className="p-4 bg-light-custom rounded-3">
            <p className="text-muted">Last Updated: February 28, 2026</p>
            {termsSections.map((section, index) => (
              <div key={section[0]} className="mb-4">
                <h5>
                  {index + 1}. {section[0]}
                </h5>
                <p className="mb-0">{section[1]}</p>
              </div>
            ))}

            <div className="mt-4">
              <h6>Return Policy Highlights</h6>
              <ul>
                <li>30-day return window for eligible new items.</li>
                <li>Original packaging is required for returns.</li>
                <li>Customized hot tubs are non-returnable after dispatch.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <section className="section-padding text-center">
      <div className="container">
        <h1 className="display-3 fw-bold">404</h1>
        <h3 className="mb-3">Page Not Found</h3>
        <p className="text-muted mb-4">
          The page you requested does not exist in this React assignment build.
        </p>
        <Link to="/" className="btn btn-primary-custom">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
