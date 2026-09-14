import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  id: string;
  adminId: string;
  adminEmail: string;
  adminRole: string;
  action: string; // 'Create' | 'Edit' | 'Delete' | 'Publish' | 'Unpublish' | 'Change Answer' | 'Change Explanation' | 'Bulk Edit' | 'Import' | 'Export' | 'Resolve Report' | 'Reject Report'
  entityType: 'Question' | 'Test' | 'Paper' | 'Report' | 'System' | 'User';
  entityId: string;
  beforeValue?: any;
  afterValue?: any;
  metadata?: Record<string, any>;
  ipAddress?: string;
  timestamp: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    adminId: { type: String, required: true, index: true },
    adminEmail: { type: String, required: true },
    adminRole: { type: String, default: 'admin' },
    action: { type: String, required: true, index: true },
    entityType: { type: String, required: true, index: true },
    entityId: { type: String, required: true, index: true },
    beforeValue: { type: Schema.Types.Mixed },
    afterValue: { type: Schema.Types.Mixed },
    metadata: { type: Schema.Types.Mixed, default: {} },
    ipAddress: { type: String, default: '127.0.0.1' },
    timestamp: { type: Date, default: Date.now, index: true }
  },
  { timestamps: { createdAt: 'timestamp', updatedAt: false } }
);

AuditLogSchema.index({ entityType: 1, entityId: 1, timestamp: -1 });

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
