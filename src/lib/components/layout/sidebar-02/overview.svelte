<script lang="ts">
    import AppAvatar from '$lib/components/app/ui/app-avatar.svelte';
  </script>
  
  <div class="overflow-x-auto shadow-md rounded-lg border border-gray-300">
    <table class="min-w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" class="px-6 py-3">Avatar</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b">
          <td class="px-6 py-4">
            <AppAvatar src="/avatars/01.png" fallback="MM" alt="avatar" />
          </td>
          <td class="px-6 py-4">Mahedi Milki</td>
          <td class="px-6 py-4">mahedimilki@gmail.com</td>
          <td class="px-6 py-4 font-medium">+$1,999.00</td>
        </tr>
        <tr class="bg-gray-50 border-b">
          <td class="px-6 py-4">
            <AppAvatar src="/avatars/02.png" fallback="PS" alt="avatar" />
          </td>
          <td class="px-6 py-4">Parves Sikder</td>
          <td class="px-6 py-4">parvessikder@gmail.com</td>
          <td class="px-6 py-4 font-medium">+$39.00</td>
        </tr>
        <tr class="bg-white border-b">
          <td class="px-6 py-4">
            <AppAvatar src="/avatars/03.png" fallback="IN" alt="avatar" />
          </td>
          <td class="px-6 py-4">Isabella Nguyen</td>
          <td class="px-6 py-4">isabella.nguyen@email.com</td>
          <td class="px-6 py-4 font-medium">+$299.00</td>
        </tr>
        <tr class="bg-gray-50 border-b">
          <td class="px-6 py-4">
            <AppAvatar src="/avatars/04.png" fallback="WK" alt="avatar" />
          </td>
          <td class="px-6 py-4">William Kim</td>
          <td class="px-6 py-4">will@email.com</td>
          <td class="px-6 py-4 font-medium">+$99.00</td>
        </tr>
        <tr class="bg-white">
          <td class="px-6 py-4">
            <AppAvatar src="/avatars/05.png" fallback="SD" alt="avatar" />
          </td>
          <td class="px-6 py-4">Sofia Davis</td>
          <td class="px-6 py-4">sofia.davis@email.com</td>
          <td class="px-6 py-4 font-medium">+$39.00</td>
        </tr>
      </tbody>
    </table>
  </div>
  