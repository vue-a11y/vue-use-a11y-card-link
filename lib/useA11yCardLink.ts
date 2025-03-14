import { ref, computed } from 'vue';

interface A11yCardLinkOptions {
  linkSelector?: string;
  clickThreshold?: number;
  disabled?: boolean;
  onNavigate?: (href: string) => void;
}

export function useA11yCardLink({
  linkSelector = 'a',
  clickThreshold = 200,
  disabled = false,
  onNavigate,
}: A11yCardLinkOptions = {}) {
  const clickStartTime = ref<number | null>(null);

  const handleMouseDown = (e: MouseEvent) => {
    if (disabled || e.button !== 0) return;
    clickStartTime.value = Date.now();
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (disabled || e.button !== 0 || clickStartTime.value === null) return;

    const elapsedTime = Date.now() - clickStartTime.value;
    clickStartTime.value = null;
    const target = e.target as HTMLElement

    if (
      elapsedTime < clickThreshold &&
      window.getSelection()?.toString() === '' &&
      !target.closest('a, button, input, select, textarea')
    ) {
      const link = (e.currentTarget as HTMLElement).querySelector(linkSelector) as HTMLAnchorElement | null;
      const href = link?.getAttribute('href');
      if (href) {
        onNavigate?.(href);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled || (e.key !== 'Enter' && e.key !== ' ')) return;

    e.preventDefault(); 
    const link = (e.currentTarget as HTMLElement).querySelector(linkSelector) as HTMLAnchorElement | null;
    const href = link?.getAttribute('href');
    if (href) {
      onNavigate?.(href);
    }
  };

  return {
    props: computed(() => ({
      onMousedown: handleMouseDown,
      onMouseup: handleMouseUp,
      onKeydown: handleKeyDown,
      tabindex: disabled ? -1 : 0,
      role: 'link',
    })),
  };
}
