<script lang="ts">
    export let name: string;
    export let className: string = '';
  </script>
  
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class={className}
  >
    {#if name === 'home'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    {:else if name === 'camera'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    {:else if name === 'history'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    {:else if name === 'user'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    {:else if name === 'book'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    {:else if name === 'collection'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2m14 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" />
    {:else if name === 'bell'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    {:else if name === 'chart-bar'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18M9 17v-6m4 6V9m4 6V5" />
    {:else if name === 'chart-pie'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9 9 0 1020.945 13H11V3.055z" />
    {:else if name === 'clipboard'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 2h6a2 2 0 012 2v2h-2.586A2 2 0 0014 4h-4a2 2 0 00-1.414.586H6V4a2 2 0 012-2z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" />
    {:else if name === 'users'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6m-6 0v-2a4 4 0 013-3.87M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
    {:else if name === 'database'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a8 3 0 018-3 8 3 0 018 3v12a8 3 0 01-8 3 8 3 0 01-8-3V6z" />
    {:else if name === 'annotation'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    {:else if name === 'logout'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    {:else if name === 'menu'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
    {:else if name === 'globe'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7.5 7.5 0 0021 12.79z" />
    {:else}
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
    {/if}
</svg>
  