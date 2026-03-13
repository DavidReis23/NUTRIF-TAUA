export default function Header() {
  return (
    <header className="top-header">
      <div className="logo-area">
        <h2>NUTRIF-TAUÁ</h2>
      </div>
      <div className="header-items">
        <button className="icon-circle">
          <i className="ph ph-sign-out"></i>
        </button>
        <button className="icon-circle notification">
          <i className="ph ph-bell"></i>
          <span className="badge">1</span>
        </button>
        <div className="profile-pill">
          <img
            src="https://ui-avatars.com/api/?name=Nutricionista&background=16A085&color=fff"
            alt="User"
          />
          <span>Nutricionista</span>
        </div>
      </div>
    </header>
  );
}
