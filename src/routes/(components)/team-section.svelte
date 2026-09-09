<script>
    import Subtitle from '$lib/components/app/ui/subtitle.svelte';
    import Title from '$lib/components/app/ui/title.svelte';
    import { m } from '$lib/paraglide/messages'
    
    const teamMember = {
        name: 'Bianca Shieu, PhD, RN',
        designation: 'Principal Investigator',
        imageUrl: '/images/team-section/bianca-shieu.png',
        logoUrl: '/images/team-section/ut-health-logo.png'
    };
</script>

<section id="team-section" class="bg-secondary px-4 sm:px-8 md:px-6 xl:px-24 py-12 sm:py-16 md:py-20">
    <div class="flex flex-col xl:flex-row gap-12 xl:gap-16 2xl:gap-24 items-start xl:items-center">
        <!-- Team Card - LEFT SIDE -->
        <div class="relative h-138 w-full max-w-132">
            <!-- Background gradient container -->
            <div class="border-primary absolute inset-0 flex items-center justify-center rounded-2xl border">
                <!-- Profile Image -->
                <div
                    class="h-full w-full rounded-[12px] bg-cover bg-center bg-no-repeat"
                    style="background-image: url({teamMember.imageUrl})"
                    role="img"
                    aria-label="Portrait of {teamMember.name}"
                ></div>
            </div>

            <!-- Info Card at bottom -->
            <div class="absolute bottom-4 left-1/2 w-[calc(100%-38px)] max-w-123 -translate-x-1/2 rounded-xl bg-white p-3 sm:p-6 shadow-lg sm:px-7">
                <div class="flex flex-row flex-wrap items-center justify-between gap-4">
                    <!-- Text Content -->
                    <div class="flex min-w-0 flex-1 flex-col gap-1">
                        <h3 class="font-poppins truncate text-xl leading-tight font-semibold text-black sm:text-2xl">
                            {teamMember.name}
                        </h3>
                        <p class="font-poppins truncate text-lg text-black sm:text-xl">
                            {teamMember.designation}
                        </p>
                    </div>

                    <!-- Logo -->
                    <div
                        class="h-11 w-25 shrink-0 bg-cover bg-center bg-no-repeat sm:h-15 sm:w-34"
                        style="background-image: url({teamMember.logoUrl})"
                        role="img"
                        aria-label="UT Health Logo"
                    ></div>
                </div>
            </div>
        </div>
        
        <!-- Header and Text - RIGHT SIDE -->
        <div class="flex flex-col gap-6 flex-1">
            <div class="flex flex-col items-start gap-2 text-left">
                <Subtitle text={m.study_team()} />
                <Title title1={m.home_study_team_headline()} class="text-left" />
            </div>
            
            <p class="text-secondary-black font-poppins text-xl sm:text-2xl leading-normal font-normal md:text-3xl">
                {m.home_study_team_description()}
            </p>
        </div>
    </div>
</section>