<script lang="ts">
 import AudioLines from "@lucide/svelte/icons/audio-lines";
 import Plus from "@lucide/svelte/icons/plus";
 import { Button } from "$lib/components/ui/button";
 import * as ButtonGroup from "$lib/components/ui/button-group";
 import * as InputGroup from "$lib/components/ui/input-group";
 import * as Tooltip from "$lib/components/ui/tooltip";
 
 let voiceEnabled = $state(false);
</script>
 
<ButtonGroup.Root class="[--radius:9999rem]">
 <ButtonGroup.Root>
  <Button variant="outline" size="icon">
   <Plus />
  </Button>
 </ButtonGroup.Root>
 <ButtonGroup.Root>
  <InputGroup.Root>
   <InputGroup.Input
    placeholder={voiceEnabled
     ? "Record and send audio..."
     : "Send a message..."}
    disabled={voiceEnabled}
   />
   <InputGroup.Addon align="inline-end">
    <Tooltip.Provider>
     <Tooltip.Root>
      <Tooltip.Trigger>
       {#snippet child({ props })}
        <InputGroup.Button
         {...props}
         onclick={() => (voiceEnabled = !voiceEnabled)}
         size="icon-xs"
         data-active={voiceEnabled}
         class="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
         aria-pressed={voiceEnabled}
        >
         <AudioLines />
        </InputGroup.Button>
       {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content>Voice Mode</Tooltip.Content>
     </Tooltip.Root>
    </Tooltip.Provider>
   </InputGroup.Addon>
  </InputGroup.Root>
 </ButtonGroup.Root>
</ButtonGroup.Root>