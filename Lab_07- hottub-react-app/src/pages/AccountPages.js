import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { recentOrders } from '../data/products';

function AccountLinks() {
  const links = [
    { to: '/my-account', label: 'Dashboard' },
    { to: '/edit-account', label: 'Edit Account' },
    { to: '/edit-billing', label: 'Edit Billing' },
    { to: '/edit-shipping', label: 'Edit Shipping' },
    { to: '/order-details', label: 'My Orders' },
  ];

  return (
    <div className="p-3 bg-light-custom rounded-3">
      <div className="text-center mb-3">
        <h6 className="mb-1">John Davidson</h6>
        <small className="text-muted">john@example.com</small>
      </div>
      <ul className="list-group">
        {links.map((item) => (
          <li className="list-group-item" key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AccountForm({ title, children }) {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <AccountLinks />
          </div>
          <div className="col-lg-8">
            <div className="p-4 bg-light-custom rounded-3">
              <h4 className="mb-3">{title}</h4>
              <form className="row g-3">
                {children}
                <div className="col-12 d-flex gap-2">
                  <button className="btn btn-primary-custom" type="submit">
                    Save Changes
                  </button>
                  <button className="btn btn-outline-secondary" type="button">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputField({ id, label, type = 'text', col = 'col-md-6', defaultValue = '' }) {
  return (
    <div className={col}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input id={id} className="form-control" type={type} defaultValue={defaultValue} required />
    </div>
  );
}

export function MyAccountPage() {
  return (
    <>
      <PageBanner title="My Account" />
      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <AccountLinks />
            </div>
            <div className="col-lg-8">
              <div className="alert alert-success">Welcome back, John!</div>
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="p-3 bg-light-custom rounded-3 text-center">
                    <h5>12</h5>
                    <p className="mb-0 text-muted">Total Orders</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light-custom rounded-3 text-center">
                    <h5>5</h5>
                    <p className="mb-0 text-muted">Wishlist Items</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light-custom rounded-3 text-center">
                    <h5>8</h5>
                    <p className="mb-0 text-muted">Reviews Given</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-light-custom rounded-3 mb-4">
                <h5 className="mb-3">Recent Orders</h5>
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Order #</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.date}</td>
                          <td>
                            <span
                              className={`badge ${
                                order.status === 'Delivered' ? 'bg-success' : 'bg-warning text-dark'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td>${order.total.toLocaleString()}</td>
                          <td>
                            <Link to="/order-details">View</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 bg-light-custom rounded-3">
                    <h6>Billing Address</h6>
                    <p className="mb-0 text-muted">John Davidson, 123 Main Street, Relaxation City, CA 90210</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light-custom rounded-3">
                    <h6>Shipping Address</h6>
                    <p className="mb-0 text-muted">John Davidson, 456 Oak Avenue, Relaxation City, CA 90210</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function EditAccountPage() {
  return (
    <>
      <PageBanner title="Edit Account" />
      <AccountForm title="Account Details">
        <InputField id="firstName" label="First Name" defaultValue="John" />
        <InputField id="lastName" label="Last Name" defaultValue="Davidson" />
        <InputField id="displayName" label="Display Name" defaultValue="john.d" />
        <InputField id="email" label="Email" type="email" defaultValue="john@example.com" />
        <InputField id="phone" label="Phone" type="tel" defaultValue="+1 (555) 123-9000" />
        <InputField id="currentPassword" label="Current Password" type="password" />
        <InputField id="newPassword" label="New Password" type="password" />
        <InputField id="confirmPassword" label="Confirm Password" type="password" />
      </AccountForm>
    </>
  );
}

export function EditBillingPage() {
  return (
    <>
      <PageBanner title="Edit Billing" />
      <AccountForm title="Billing Address">
        <InputField id="billFirstName" label="First Name" defaultValue="John" />
        <InputField id="billLastName" label="Last Name" defaultValue="Davidson" />
        <InputField id="billCompany" label="Company (Optional)" defaultValue="" />
        <div className="col-md-6">
          <label htmlFor="billCountry" className="form-label">Country</label>
          <select id="billCountry" className="form-select" defaultValue="US">
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        <InputField id="billStreet" label="Street Address" col="col-12" defaultValue="123 Main Street" />
        <InputField id="billApt" label="Apartment/Suite (Optional)" col="col-12" defaultValue="" />
        <InputField id="billCity" label="City" defaultValue="Relaxation City" />
        <div className="col-md-6">
          <label htmlFor="billState" className="form-label">State</label>
          <select id="billState" className="form-select" defaultValue="CA">
            <option value="CA">CA</option>
            <option value="NY">NY</option>
            <option value="TX">TX</option>
            <option value="FL">FL</option>
            <option value="WA">WA</option>
          </select>
        </div>
        <InputField id="billZip" label="ZIP Code" defaultValue="90210" />
        <InputField id="billPhone" label="Phone" type="tel" defaultValue="+1 (555) 123-9000" />
        <InputField id="billEmail" label="Email" type="email" defaultValue="john@example.com" />
      </AccountForm>
    </>
  );
}

export function EditShippingPage() {
  return (
    <>
      <PageBanner title="Edit Shipping" />
      <AccountForm title="Shipping Address">
        <div className="col-12 form-check mb-2">
          <input className="form-check-input" type="checkbox" id="sameAsBilling" />
          <label className="form-check-label" htmlFor="sameAsBilling">Same as billing address</label>
        </div>
        <InputField id="shipFirstName" label="First Name" defaultValue="John" />
        <InputField id="shipLastName" label="Last Name" defaultValue="Davidson" />
        <InputField id="shipCompany" label="Company (Optional)" defaultValue="" />
        <div className="col-md-6">
          <label htmlFor="shipCountry" className="form-label">Country</label>
          <select id="shipCountry" className="form-select" defaultValue="US">
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        <InputField id="shipStreet" label="Street Address" col="col-12" defaultValue="456 Oak Avenue" />
        <InputField id="shipApt" label="Apartment/Suite (Optional)" col="col-12" defaultValue="" />
        <InputField id="shipCity" label="City" defaultValue="Relaxation City" />
        <div className="col-md-6">
          <label htmlFor="shipState" className="form-label">State</label>
          <select id="shipState" className="form-select" defaultValue="CA">
            <option value="CA">CA</option>
            <option value="NY">NY</option>
            <option value="TX">TX</option>
            <option value="FL">FL</option>
            <option value="WA">WA</option>
          </select>
        </div>
        <InputField id="shipZip" label="ZIP Code" defaultValue="90210" />
        <InputField id="shipPhone" label="Phone" type="tel" defaultValue="+1 (555) 123-9000" />
      </AccountForm>
    </>
  );
}
