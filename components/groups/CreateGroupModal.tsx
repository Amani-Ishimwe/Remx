"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Users, KeyRound, Sparkles } from "lucide-react";
import { useRemxStore } from "@/lib/store";

export interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (groupId: string) => void;
}

export function CreateGroupModal({ isOpen, onClose, onCreated }: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { createGroup } = useRemxStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const group = createGroup(
      name.trim(),
      description.trim() || "Technical study cohort for spaced retention and shared decks."
    );
    setName("");
    setDescription("");
    onClose();
    onCreated?.(group.id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Study Group / Cohort"
      description="Form a shared reading cohort. Members can pool technical decks and share review momentum."
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <Input
          label="Cohort Name"
          placeholder="e.g. Distributed Systems Working Group"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Textarea
          label="Cohort Focus & Description"
          placeholder="What technical domains, papers, or systems is this cohort mastering?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-remx-200">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" type="submit" disabled={!name.trim()}>
            Create Cohort
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoined?: (groupId: string) => void;
}

export function JoinGroupModal({ isOpen, onClose, onJoined }: JoinGroupModalProps) {
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const { joinGroup } = useRemxStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    const res = joinGroup(inviteCode.trim());
    if (res.success && res.group) {
      setInviteCode("");
      setError("");
      onClose();
      onJoined?.(res.group.id);
    } else {
      setError(res.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Join Existing Cohort"
      description="Enter the invite code provided by your study group owner."
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <Input
          label="Cohort Invite Code"
          placeholder="e.g. KERNEL-2026 or DISTRIB-88"
          value={inviteCode}
          onChange={(e) => {
            setInviteCode(e.target.value);
            setError("");
          }}
          error={error}
          hint="Try default sample codes: KERNEL-2026 or DISTRIB-88"
          required
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-remx-200">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" type="submit" disabled={!inviteCode.trim()}>
            Join Cohort
          </Button>
        </div>
      </form>
    </Modal>
  );
}
