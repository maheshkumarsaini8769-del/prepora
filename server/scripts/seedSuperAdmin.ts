import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { AuthorizedAdmin } from '../models/Admin.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepora_db';

async function seedSuperAdmin() {
  await mongoose.connect(MONGODB_URI);
  console.log('[Seed] Connected to MongoDB');

  const defaultPassword = 'AdminPassword123!';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(defaultPassword, salt);

  const adminProfiles = [
    {
      id: 'usr_admin_mahesh',
      name: 'Mahesh Kumar (System Owner)',
      email: 'maheshkumarsaini8769@gmail.com',
      role: 'admin' as const,
      status: 'active' as const,
      passwordHash,
      targetExam: 'JEE' as const,
      classLevel: '12' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maheshkumarsaini8769'
    },
    {
      id: 'usr_admin_master',
      name: 'Prepora Super Admin',
      email: 'admin@prepora.com',
      role: 'admin' as const,
      status: 'active' as const,
      passwordHash,
      targetExam: 'JEE' as const,
      classLevel: '12' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin_master'
    }
  ];

  for (const adm of adminProfiles) {
    const existing = await User.findOne({ email: adm.email });
    if (existing) {
      existing.role = 'admin';
      existing.status = 'active';
      if (!existing.passwordHash) existing.passwordHash = passwordHash;
      await existing.save();
      console.log(`[Seed] Updated existing user to admin: ${adm.email}`);
    } else {
      await User.create(adm);
      console.log(`[Seed] Created new admin user: ${adm.email}`);
    }

    // Also ensure in AuthorizedAdmin collection
    await AuthorizedAdmin.findOneAndUpdate(
      { email: adm.email },
      { email: adm.email, role: 'SUPER ADMIN', addedBy: 'System Primary', addedAt: new Date() },
      { upsert: true }
    );
  }

  const allAdmins = await User.find({ role: 'admin' });
  console.log(`[Seed] Total admin users in DB: ${allAdmins.length}`);
  allAdmins.forEach(a => console.log(`  - ${a.email} (${a.name}) [id: ${a.id}]`));

  await mongoose.disconnect();
  console.log('[Seed] Done.');
}

seedSuperAdmin().catch((err) => {
  console.error('[Seed Error]', err);
  process.exit(1);
});
