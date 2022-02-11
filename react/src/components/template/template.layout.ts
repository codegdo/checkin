const base = `
<div class="template">
  <aside class="template-aside">
    <div class="container">
      <header>
        <span>PartnerPortal</span>
        <h1>An Interactive Channel Platform</h1>
      </header>
      <main></main>
    </div>
  </aside>
  <main class="template-main">
    <div class="container">
      <Content {...props} />
      <div class="terms hidden"><small>Creating an account means you’re okay with our <a href="#">Terms</a>.</small></div>
    </div>
  </main>
</div> 
`;

const external = `
<div class="external">
  <header class="external-header">
    <div class="container"> 
      <nav class="nav _bar">
        <div class="nav-brand"><Link to="/">External App</Link></div>
        <ul class="nav-link nav_main"><NavMain {...props}/></ul>
        <ul class="nav-link nav_profile"><NavProfile {...props} /></ul>
      </nav>
    </div> 
  </header>
  <aside class="external-aside">
    <ul class="nav-menu nav_sub"><NavSub {...props} /></ul>
  </aside>
  <main class="external-main">
    <div class="container">
      <div id="placeholder">
        <Content {...props} />
      </div>
    </div>  
  </main>
</div>
`;

const internal = `
<div class="internal">
  <header class="internal-header">
    <div class="container"> 
      <nav class="nav _bar">
        <div class="nav-brand"><Link to="/">Internal App</Link></div>
        <ul class="nav-link nav_main"><NavMain {...props}/></ul>
        <ul class="nav-link nav_profile"><NavProfile {...props} /></ul>
      </nav>
    </div> 
  </header>
  <aside class="internal-aside">
  <ul class="nav-menu nav_sub"><NavSub {...props} /></ul>
  </aside>
  <main class="internal-main">
    <div class="container">
      <div id="placeholder">
        <Content {...props} />
      </div>
    </div>  
  </main>
</div>
`;

const system = `
<div class="internal">
  <header class="internal-header">
    <div class="container"> 
      <nav class="nav _bar">
        <div class="nav-brand"><Link to="/">Internal App</Link></div>
        <ul class="nav-link nav_main"><NavMain {...props}/></ul>
        <ul class="nav-link nav_profile"><NavProfile {...props} /></ul>
      </nav>
    </div> 
  </header>
  <aside class="internal-aside">
    <ul class="nav-menu nav_sub"><NavSub {...props} /></ul>
  </aside>
  <main class="internal-main">
    <div class="container">
      <div id="placeholder">
        <Content {...props} />
      </div>
    </div>  
  </main>
</div>
`;

export const templates = {
  base,
  external,
  internal,
  system
}