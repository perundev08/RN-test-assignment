import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { FlagReason } from '../types';
import { FLAG_REASONS, FLAG_REASON_LABELS, FLAG_REASON_ICONS } from '../constants';

interface FlagReasonModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectReason: (reason: FlagReason) => void;
}

export const FlagReasonModal: React.FC<FlagReasonModalProps> = ({
  visible,
  onClose,
  onSelectReason,
}) => {
  const handleSelectReason = (reason: FlagReason) => {
    onSelectReason(reason);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Flag Post</Text>
              <Text style={styles.subtitle}>
                Please select a reason for flagging this post:
              </Text>

              <ScrollView style={styles.reasonsList} showsVerticalScrollIndicator={false}>
                {FLAG_REASONS.map((reason) => (
                  <TouchableOpacity
                    key={reason}
                    style={styles.reasonItem}
                    onPress={() => handleSelectReason(reason)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.reasonIcon}>
                      {FLAG_REASON_ICONS[reason]}
                    </Text>
                    <Text style={styles.reasonText}>
                      {FLAG_REASON_LABELS[reason]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6D6D70',
    marginBottom: 24,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  reasonsList: {
    maxHeight: 300,
    marginBottom: 16,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#F5F5F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  reasonIcon: {
    fontSize: 26,
    marginRight: 14,
    width: 36,
    textAlign: 'center',
  },
  reasonText: {
    fontSize: 17,
    color: '#1C1C1E',
    fontWeight: '600',
    flex: 1,
    letterSpacing: -0.2,
  },
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  cancelButtonText: {
    fontSize: 17,
    color: '#6D6D70',
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});

