<script setup>
import { ref, onMounted, computed } from 'vue';
import HomeNavbar from '../components/home/HomeNavbar.vue';
import { getTransactions, createTransaction, deleteTransaction } from '../api/transactionApi';
import Transaction from '../models/transaction';
import authStore from '../auth/authStore';
import Papa from 'papaparse';
import { Plus, Upload, Trash2, Loader2 } from '@lucide/vue';


console.log("Current user in authStore:", authStore.currentUser);

const transactions = ref([]);
const loading = ref(false);
const submitting = ref(false);
const error = ref('');

const newTransaction = ref(new Transaction({ direction: 'debit', type: 'DEBIT_CARD' }));

const showUploadModal = ref(false);
const fileContent = ref(null);
const uploadLoading = ref(false);

const userId = computed(() => {
    console.log("Current user id is : in store:", authStore.currentUser.id);
    return authStore.currentUser?.id; 
});

const fetchTransactions = async () => {
    loading.value = true;
    error.value = '';
    try {
        if (userId.value) {
            transactions.value = await getTransactions(userId.value);
        }
    } catch (err) {
        error.value = 'Failed to load transactions.';
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const handleCreateTransaction = async () => {
    if (!newTransaction.value.description || !newTransaction.value.amount || !newTransaction.value.date) {
        alert("Please fill in required fields: Date, Description, Amount.");
        return;
    }

    submitting.value = true;
    try {
        newTransaction.value.userId = userId.value;
        const created = await createTransaction(newTransaction.value);
        if (created) {
            transactions.value.unshift(created);
            newTransaction.value = new Transaction({ direction: 'debit', type: 'DEBIT_CARD' });
        }
    } catch (err) {
        console.error("Error creating transaction", err);
        alert("Failed to create transaction.");
    } finally {
        submitting.value = false;
    }
};

const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    try {
        const success = await deleteTransaction(id, userId.value);
        if (success) {
            transactions.value = transactions.value.filter(t => t.id !== id);
        }
    } catch (err) {
        console.error("Error deleting transaction", err);
        alert("Failed to delete transaction.");
    }
};

const handleFileUpload = (event) => {
    fileContent.value = event.target.files[0];
};

const processUpload = () => {
    if (!fileContent.value) return;
    uploadLoading.value = true;

    Papa.parse(fileContent.value, {
        skipEmptyLines: true,
        complete: async (results) => {
            const rows = results.data;
            let successCount = 0;
            let failCount = 0;
            
            for (const row of rows) {
                // Filter out empty strings from the row to handle weird tab spacing
                const cols = row.map(c => String(c).trim()).filter(c => c !== '');
                if (cols.length < 4) continue;

                const directionStr = cols[0].toLowerCase();
                if (directionStr !== 'debit' && directionStr !== 'credit') continue;

                const dateStr = cols[1];
                let descStr = cols[2];
                let amount = 0;
                let type = 'OTHER';

                // Find amount (first negative/positive float with a decimal usually)
                for (let i = 2; i < cols.length; i++) {
                    const val = cols[i];
                    // Very simple heuristic to find amount
                    if (!isNaN(parseFloat(val)) && val.includes('.')) {
                        amount = Math.abs(parseFloat(val));
                        // Description is everything before this amount index (starting at index 2)
                        descStr = cols.slice(2, i).join(' ');
                        // Type is usually the next string
                        if (i + 1 < cols.length && isNaN(parseFloat(cols[i+1]))) {
                            type = cols[i+1];
                        }
                        break;
                    }
                }

                if (amount === 0) continue;

                const tObj = new Transaction({
                    userId: userId.value,
                    direction: directionStr === 'debit' ? 'debit' : 'credit',
                    date: dateStr,
                    description: descStr,
                    amount: amount,
                    type: type,
                });

                try {
                    await createTransaction(tObj);
                    successCount++;
                } catch (e) {
                    console.error("Failed to upload row", row, e);
                    failCount++;
                }
            }

            alert(`Upload complete. Success: ${successCount}, Failed: ${failCount}`);
            showUploadModal.value = false;
            uploadLoading.value = false;
            fileContent.value = null;
            fetchTransactions();
        },
        error: (error) => {
            console.error("Error parsing CSV:", error);
            alert("Error parsing file.");
            uploadLoading.value = false;
        }
    });
};

onMounted(() => {
    fetchTransactions();
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
    <HomeNavbar />
    
    <main class="max-w-[1400px] mx-auto px-6 mt-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
        <p class="text-slate-500 mt-1">Manage and view all your financial transactions.</p>
      </div>

      <!-- Transactions List Table -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h2 class="text-lg font-bold text-slate-900">All Transactions</h2>
            <button @click="fetchTransactions" class="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center">
                <Loader2 v-if="loading" class="w-4 h-4 mr-1 animate-spin" /> Refresh
            </button>
        </div>
        
        <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table class="w-full text-left border-collapse relative">
                <thead class="sticky top-0 z-10 bg-slate-50 border-b border-slate-200">
                    <tr class="text-slate-500 text-xs uppercase tracking-wider">
                        <th class="px-6 py-3 font-semibold">Date</th>
                        <th class="px-6 py-3 font-semibold">Description</th>
                        <th class="px-6 py-3 font-semibold">Type</th>
                        <th class="px-6 py-3 font-semibold">Direction</th>
                        <th class="px-6 py-3 font-semibold text-right">Amount</th>
                        <th class="px-6 py-3 font-semibold text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="loading && transactions.length === 0">
                        <td colspan="6" class="px-6 py-8 text-center text-slate-500">
                            <Loader2 class="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
                            Loading transactions...
                        </td>
                    </tr>
                    <tr v-else-if="transactions.length === 0">
                        <td colspan="6" class="px-6 py-8 text-center text-slate-500">No transactions found.</td>
                    </tr>
                    <tr v-for="t in transactions" :key="t.id" class="hover:bg-slate-50/50 transition-colors">
                        <td class="px-6 py-4 text-sm font-medium text-slate-700">{{ t.date }}</td>
                        <td class="px-6 py-4 text-sm text-slate-900 truncate max-w-xs" :title="t.description">{{ t.description }}</td>
                        <td class="px-6 py-4 text-sm text-slate-500">{{ t.type }}</td>
                        <td class="px-6 py-4 text-sm">
                            <span :class="t.direction === 'credit' ? 'text-green-600 bg-green-50 border-green-100' : 'text-slate-600 bg-slate-100 border-slate-200'" class="px-2.5 py-0.5 rounded-full border text-xs font-semibold uppercase">
                                {{ t.direction }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm font-bold text-right" :class="t.direction === 'credit' ? 'text-green-600' : 'text-slate-900'">
                            {{ t.direction === 'credit' ? '+' : '-' }}${{ t.amount.toFixed(2) }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            <button @click="handleDelete(t.id)" class="text-red-400 hover:text-red-600 transition-colors p-1" title="Delete">
                                <Trash2 class="w-4 h-4" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>

      <!-- Add New Transaction Form -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
            <Plus class="w-5 h-5 mr-2 text-blue-600" /> Add New Transaction
        </h2>
        
        <form @submit.prevent="handleCreateTransaction" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
                <input type="date" v-model="newTransaction.date" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
            </div>

            <div class="lg:col-span-2">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <input type="text" v-model="newTransaction.description" placeholder="e.g. Grocery store" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
            </div>

            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Amount</label>
                <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input type="number" step="0.01" min="0" v-model="newTransaction.amount" placeholder="0.00" class="w-full border border-slate-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
                </div>
            </div>

            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Direction</label>
                <select v-model="newTransaction.direction" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                    <option value="debit">Debit (Expense)</option>
                    <option value="credit">Credit (Income)</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Type</label>
                <select v-model="newTransaction.type" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                    <option value="DEBIT_CARD">DEBIT_CARD</option>
                    <option value="ACH_CREDIT">ACH_CREDIT</option>
                    <option value="ACH_DEBIT">ACH_DEBIT</option>
                    <option value="QUICKPAY_DEBIT">QUICKPAY_DEBIT</option>
                    <option value="QUICKPAY_CREDIT">QUICKPAY_CREDIT</option>
                    <option value="CHASE_TO_PARTNERFI">CHASE_TO_PARTNERFI</option>
                    <option value="MISC_DEBIT">MISC_DEBIT</option>
                    <option value="OTHER">OTHER</option>
                </select>
            </div>
            
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Category (Optional)</label>
                <input type="text" v-model="newTransaction.category" placeholder="e.g. Groceries, Rent" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>

            <div class="md:col-span-2 lg:col-span-3 flex justify-end mt-2">
                <button type="submit" :disabled="submitting" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors flex items-center disabled:opacity-70">
                    <Loader2 v-if="submitting" class="w-4 h-4 mr-2 animate-spin" />
                    <span v-else>Save Transaction</span>
                </button>
            </div>
        </form>
      </div>

      <!-- Upload Actions -->
      <div class="flex justify-end">
         <button @click="showUploadModal = true" class="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-colors flex items-center">
            <Upload class="w-5 h-5 mr-2" /> Upload Transactions (CSV)
        </button>
      </div>
    </main>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
        <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 class="text-xl font-bold text-slate-900">Upload CSV / Excel File</h2>
          <button @click="showUploadModal = false" class="text-slate-400 hover:text-slate-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">&times;</button>
        </div>
        
        <div class="p-6">
          <p class="text-sm text-slate-500 mb-4">
             Upload a `.csv` or `.txt` file containing your transactions. We support tabular data with columns for Date, Description, Amount, and Type.
          </p>
          
          <div class="mb-6">
            <input type="file" accept=".csv, .txt, .tsv" @change="handleFileUpload" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"/>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button @click="showUploadModal = false" class="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition-colors">
              Cancel
            </button>
            <button @click="processUpload" :disabled="uploadLoading || !fileContent" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-colors flex items-center disabled:opacity-60">
              <Loader2 v-if="uploadLoading" class="w-4 h-4 mr-2 animate-spin" />
              <span v-else>Upload Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>