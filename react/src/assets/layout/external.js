export const templateExternal = `
<div class="external">
  <header class="external-header">
    <div class="container"> 
      <nav class="nav -bar">
        <div class="nav-logo"><Link to="/">External App</Link></div>
        <ul class="nav-link nav_main"><NavMain {...props}/></ul>
        <ul class="nav-link nav_menu"><NavMenuProfile {...props} /></ul>
      </nav>
    </div> 
  </header>
  <aside class="external-aside">
    <NavSub {...props} />
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
