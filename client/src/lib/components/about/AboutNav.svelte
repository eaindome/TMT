<script lang="ts">
    import { onMount } from 'svelte';
    
    let activeSection = "mission";
    let scrolling = false;
    
    // List of sections for navigation
    const sections = [
      { id: "mission", label: "Our Mission" },
      { id: "story", label: "Our Story" },
      { id: "technology", label: "Technology" },
      { id: "team", label: "Team" },
      { id: "commitment", label: "Commitment" }
    ];
    
    // Scroll to section when nav item is clicked
    function scrollToSection(sectionId: string) {
      scrolling = true;
      activeSection = sectionId;
      
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          scrolling = false;
        }, 1000);
      }
    }
    
    // Update active section based on scroll position
    onMount(() => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      );
      
      window.addEventListener('scroll', () => {
        if (scrolling) return;
        
        const scrollPosition = window.scrollY + 100;
        
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section && section.offsetTop <= scrollPosition) {
            activeSection = sections[i].id;
            break;
          }
        }
      });
    });
</script>
  
<nav class="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-10">
    <ul class="space-y-6">
      {#each sections as section}
        <li>
          <button 
            class="flex items-center group" 
            on:click={() => scrollToSection(section.id)}
            aria-label={section.label}
          >
            <span 
              class="h-3 w-3 rounded-full transition-all duration-300 mr-3 {activeSection === section.id ? 'bg-[#1a5f4a]' : 'bg-gray-300 group-hover:bg-[#4caf50]'}"
            ></span>
            <span 
              class="text-sm transition-all duration-300 {activeSection === section.id ? 'text-[#1a5f4a] font-medium' : 'text-gray-500 group-hover:text-gray-700'}"
            >
              {section.label}
            </span>
          </button>
        </li>
      {/each}
    </ul>
</nav>