<script lang="ts">
    import {m} from '$lib/paraglide/messages'
    const partners = [
        {
            name: 'UT Health San Antonio',
            logo: '/images/partner-section/texas-university.svg',
            maxWidth: 'max-w-[150px] sm:max-w-[221px]'
        },
        {
            name: 'UT San Antonio',
            logo: '/images/partner-section/ut-san-antonio.svg',
            maxWidth: 'max-w-[246px] sm:max-w-[364px]'
        },
        {
            name: 'UT Health San Antonio School of Nursing',
            logo: '/images/partner-section/texas-university-nursing.svg',
            maxWidth: 'max-w-[150px] sm:max-w-[225px]'
        },
        {
            name: 'InNeed',
            logo: '/images/partner-section/inneed-logo.svg',
            maxWidth: 'max-w-[232px] sm:max-w-[344px]'
        }
    ];
</script>

<section class="bg-secondary px-4 py-12 sm:px-8 md:px-6 md:py-16 lg:py-20 xl:px-24">
    <div class="py-4 sm:py-12">
        <div
            class="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16 xl:gap-24 2xl:gap-40"
        >
            <!-- Title -->
            <h2
                class="font-baskerville shrink-0 text-3xl leading-tight font-bold text-black sm:text-4xl lg:max-w-113.25 lg:text-[45px] lg:leading-16.5"
            >
                {m.home_partnership()}
            </h2>

            <!-- Partner Logos - Changed to 2x2 grid layout -->
            <div
                class="flex-1 grid grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 max-w-2xl lg:max-w-none"
            >
                {#each partners as partner, index}
                    <div
                        class="flex items-center justify-center {partner.maxWidth}"
                    >
                        <img src={partner.logo} alt={partner.name} class="h-auto w-full object-contain" />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>