import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const mainNavItems = [
    { path: '/', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/failed-payments', label: 'Failed Payments', icon: 'bi-exclamation-triangle' },
    { path: '/recovery', label: 'Recovery Tasks', icon: 'bi-arrow-repeat' },
    { path: '/insights', label: 'Analytics Insights', icon: 'bi-graph-up' },
  ];

  return (
    <aside className="bg-white border-end p-3 d-flex flex-column" style={{ width: '240px', minWidth: '240px', minHeight: 'calc(100vh - 65px)', flexShrink: 0}}>
      {/* Top Main Navigation */}
      <ul className="nav nav-pills flex-column">
        {mainNavItems.map((item) => (
          <li className="nav-item mb-1" key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center px-3 py-2 rounded-2 fw-medium ${
                  isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary hover-bg-light'
                }`
              }
            >
              <i className={`bi ${item.icon} me-2 fs-5`}></i>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Bottom Settings Link (mt-auto pushes it to the bottom) */}
      <div className="mt-auto pt-3 border-top">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center px-3 py-2 rounded-2 fw-medium ${
              isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary hover-bg-light'
            }`
          }
        >
          <i className="bi bi-gear me-2 fs-5"></i>
          Settings
        </NavLink>
      </div>
    </aside>
  );
}