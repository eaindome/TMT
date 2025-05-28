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
    {:else if name === 'chat'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    {:else if name === 'forum'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    {:else if name === 'message-circle'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
    {:else if name === 'comments'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3C9.847 3 7.74 3.113 5.707 3.513c-1.584.233-2.707 1.626-2.707 3.228v6.768z" />
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
    {:else if name === 'chevron-left'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    {:else if name === 'chevron-right'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    {:else if name === 'chevrons-left'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    {:else if name === 'chevrons-right'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    {:else if name === 'menu-fold'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7M16 18l-4-4 4-4" />
    {:else if name === 'menu-unfold'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7M12 18l4-4-4-4" />
    {:else if name === 'layout-sidebar'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5v14" />
    {:else if name === 'arrow-left-right'}
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 7l-4 4 4 4M16 7l4 4-4 4M7 11h10" />
    {:else}
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
    {/if}
</svg>
  