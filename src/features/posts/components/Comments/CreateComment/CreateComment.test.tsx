import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RelayEnvironmentProvider } from 'react-relay';
import { createMockEnvironment } from 'relay-test-utils';
import { CreateComment } from './CreateComment';

describe('CreateComment Component', () => {
  let environment: ReturnType<typeof createMockEnvironment>;
  let mockOnCancelReply: ReturnType<typeof vi.fn>;
  let mockOnSubmitSuccess: ReturnType<typeof vi.fn>;
  let defaultProps: {
    postId: string;
    connectionId: string;
    onCancelReply: ReturnType<typeof vi.fn>;
    onSubmitSuccess: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    environment = createMockEnvironment();
    mockOnCancelReply = vi.fn();
    mockOnSubmitSuccess = vi.fn();
    defaultProps = {
      postId: 'test-post-id',
      connectionId: 'test-connection-id',
      onCancelReply: mockOnCancelReply,
      onSubmitSuccess: mockOnSubmitSuccess,
    };
  });

  const renderCreateComment = (props = {}) => {
    return render(
      <RelayEnvironmentProvider environment={environment}>
        <CreateComment {...defaultProps} {...props} />
      </RelayEnvironmentProvider>
    );
  };

  describe('Basic Rendering', () => {
    it('should render textarea with placeholder', () => {
      renderCreateComment();
      expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument();
    });

    it('should render submit button', () => {
      renderCreateComment();
      expect(screen.getByLabelText('Submit comment')).toBeInTheDocument();
    });

    it('should have submit button disabled by default', () => {
      renderCreateComment();
      const submitButton = screen.getByLabelText('Submit comment');
      expect(submitButton).toBeDisabled();
    });
  });

  describe('User Input', () => {
    it('should allow typing in textarea', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'My test comment');

      expect(textarea).toHaveValue('My test comment');
    });

    it('should enable submit button when content is valid', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'Valid comment');

      const submitButton = screen.getByLabelText('Submit comment');
      expect(submitButton).not.toBeDisabled();
    });

    it('should disable submit button for whitespace-only content', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, '   ');

      const submitButton = screen.getByLabelText('Submit comment');
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Character Counter', () => {
    it('should show character counter when typing', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'Test');

      expect(screen.getByText('4/500')).toBeInTheDocument();
    });

    it('should not show counter when textarea is empty', () => {
      renderCreateComment();
      expect(screen.queryByText('/500')).not.toBeInTheDocument();
    });

    it('should show yellow color when approaching limit', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'a'.repeat(450));

      const counter = screen.getByText('450/500');
      expect(counter).toHaveClass('text-yellow-400');
    });

    it('should show red color when near limit', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'a'.repeat(495));

      const counter = screen.getByText('495/500');
      expect(counter).toHaveClass('text-red-400');
    });

    it('should enforce 500 character maximum', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');

      // Try to type more than 500 characters
      await user.type(textarea, 'a'.repeat(501));

      // Should be truncated to 500
      expect(textarea).toHaveValue('a'.repeat(500));
    });
  });

  describe('Comment Submission', () => {
    it('should trigger mutation on submit button click', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'Test comment');

      const submitButton = screen.getByLabelText('Submit comment');
      await user.click(submitButton);

      await waitFor(() => {
        expect(environment.mock.getMostRecentOperation()).toBeDefined();
      });

      const operation = environment.mock.getMostRecentOperation();
      expect(operation.request.node.operation.name).toBe('CreateCommentMutation');
      expect(operation.request.variables).toEqual({
        content: 'Test comment',
        postId: 'test-post-id',
        parentCommentId: undefined,
        connections: ['test-connection-id'],
      });
    });

    it('should trigger mutation on Enter key', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'Test comment{Enter}');

      await waitFor(() => {
        expect(environment.mock.getMostRecentOperation()).toBeDefined();
      });

      const operation = environment.mock.getMostRecentOperation();
      expect(operation.request.variables.content).toBe('Test comment');
    });

    it('should NOT submit on Shift+Enter', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'Line 1{Shift>}{Enter}{/Shift}Line 2');

      expect(textarea).toHaveValue('Line 1\nLine 2');
      expect(environment.mock.getAllOperations()).toHaveLength(0);
    });

    it('should clear textarea after successful submission', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'Test comment');

      const submitButton = screen.getByLabelText('Submit comment');
      await user.click(submitButton);

      await waitFor(() => {
        const operation = environment.mock.getMostRecentOperation();
        environment.mock.resolve(operation, {
          data: {
            createComment: {
              commentEdge: {
                node: {
                  id: 'new-comment-id',
                  content: 'Test comment',
                  insertedAt: new Date().toISOString(),
                  wasEdited: false,
                  commentLikesCount: 0,
                  repliesCount: 0,
                  parentCommentId: null,
                  user: {
                    id: 'user-id',
                    name: 'Test',
                    surname: 'User',
                  },
                },
              },
              parent: {
                __typename: 'Post',
                id: 'test-post-id',
              },
            },
          },
        });
      });

      await waitFor(() => {
        expect(textarea).toHaveValue('');
      });
    });

    it('should call onSubmitSuccess after successful submission', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'Test comment');

      const submitButton = screen.getByLabelText('Submit comment');
      await user.click(submitButton);

      await waitFor(() => {
        const operation = environment.mock.getMostRecentOperation();
        environment.mock.resolve(operation, {
          data: {
            createComment: {
              commentEdge: {
                node: {
                  id: 'new-comment-id',
                  content: 'Test comment',
                },
              },
              parent: {
                __typename: 'Post',
                id: 'test-post-id',
              },
            },
          },
        });
      });

      await waitFor(() => {
        expect(mockOnSubmitSuccess).toHaveBeenCalled();
      });
    });

    it('should trim whitespace before submission', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, '  Test comment  ');

      const submitButton = screen.getByLabelText('Submit comment');
      await user.click(submitButton);

      await waitFor(() => {
        const operation = environment.mock.getMostRecentOperation();
        expect(operation.request.variables.content).toBe('Test comment');
      });
    });

    it('should not submit when disabled (creating)', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'Test comment');

      const submitButton = screen.getByLabelText('Submit comment');

      // Click once to start creation
      await user.click(submitButton);

      // Try to click again while creating
      await user.click(submitButton);

      // Should only have one operation
      await waitFor(() => {
        expect(environment.mock.getAllOperations().length).toBe(1);
      });
    });
  });

  describe('Reply Mode', () => {
    it('should show reply badge when in reply mode', () => {
      renderCreateComment({
        parentCommentId: 'parent-comment-id',
        parentConnectionId: 'parent-connection-id',
        replyingToUserName: 'John Doe',
      });

      expect(screen.getByText(/Replying to/i)).toBeInTheDocument();
      expect(screen.getByText(/@John Doe/i)).toBeInTheDocument();
    });

    it('should prefill textarea with @ mention when replying', () => {
      renderCreateComment({
        parentCommentId: 'parent-comment-id',
        parentConnectionId: 'parent-connection-id',
        replyingToUserName: 'John Doe',
      });

      const textarea = screen.getByPlaceholderText('Add a comment...');
      expect(textarea).toHaveValue('@John Doe ');
    });

    it('should show cancel reply button in reply mode', () => {
      renderCreateComment({
        parentCommentId: 'parent-comment-id',
        parentConnectionId: 'parent-connection-id',
        replyingToUserName: 'John Doe',
      });

      expect(screen.getByLabelText('Cancel reply')).toBeInTheDocument();
    });

    it('should call onCancelReply when cancel button clicked', async () => {
      const user = userEvent.setup();
      renderCreateComment({
        parentCommentId: 'parent-comment-id',
        parentConnectionId: 'parent-connection-id',
        replyingToUserName: 'John Doe',
      });

      const cancelButton = screen.getByLabelText('Cancel reply');
      await user.click(cancelButton);

      expect(mockOnCancelReply).toHaveBeenCalled();
    });

    it('should send parentCommentId in mutation when replying', async () => {
      const user = userEvent.setup();
      renderCreateComment({
        parentCommentId: 'parent-comment-id',
        parentConnectionId: 'parent-connection-id',
        replyingToUserName: 'John Doe',
      });

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.clear(textarea);
      await user.type(textarea, 'Reply message');

      const submitButton = screen.getByLabelText('Submit comment');
      await user.click(submitButton);

      await waitFor(() => {
        const operation = environment.mock.getMostRecentOperation();
        expect(operation.request.variables).toEqual({
          content: 'Reply message',
          postId: 'test-post-id',
          parentCommentId: 'parent-comment-id',
          connections: ['parent-connection-id'],
        });
      });
    });

    it('should call onCancelReply after successful reply submission', async () => {
      const user = userEvent.setup();
      renderCreateComment({
        parentCommentId: 'parent-comment-id',
        parentConnectionId: 'parent-connection-id',
        replyingToUserName: 'John Doe',
      });

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.clear(textarea);
      await user.type(textarea, 'Reply');

      const submitButton = screen.getByLabelText('Submit comment');
      await user.click(submitButton);

      await waitFor(() => {
        const operation = environment.mock.getMostRecentOperation();
        environment.mock.resolve(operation, {
          data: {
            createComment: {
              commentEdge: {
                node: {
                  id: 'new-reply-id',
                  content: 'Reply',
                },
              },
              parent: {
                __typename: 'Comment',
                id: 'parent-comment-id',
                repliesCount: 1,
              },
            },
          },
        });
      });

      await waitFor(() => {
        expect(mockOnCancelReply).toHaveBeenCalled();
      });
    });
  });

  describe('Auto-resize Textarea', () => {
    it('should auto-resize textarea as content grows', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...') as HTMLTextAreaElement;
      const initialHeight = textarea.style.height;

      // Type multiple lines
      await user.type(textarea, 'Line 1\nLine 2\nLine 3\nLine 4');

      // Height should have changed (increased)
      expect(textarea.style.height).not.toBe(initialHeight);
    });

    it('should respect maximum height of 120px', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...') as HTMLTextAreaElement;

      // Type many lines to exceed max height
      await user.type(textarea, Array(20).fill('Long line of text').join('\n'));

      const height = parseInt(textarea.style.height);
      expect(height).toBeLessThanOrEqual(120);
    });
  });

  describe('Error Handling', () => {
    it('should log error on mutation failure', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'Test comment');

      const submitButton = screen.getByLabelText('Submit comment');
      await user.click(submitButton);

      await waitFor(() => {
        const operation = environment.mock.getMostRecentOperation();
        environment.mock.reject(operation, new Error('Network error'));
      });

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Failed to create comment:',
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('should disable textarea while submitting', async () => {
      const user = userEvent.setup();
      renderCreateComment();

      const textarea = screen.getByPlaceholderText('Add a comment...');
      await user.type(textarea, 'Test comment');

      const submitButton = screen.getByLabelText('Submit comment');
      await user.click(submitButton);

      // Textarea should be disabled during submission
      expect(textarea).toBeDisabled();
    });

    it('should have proper ARIA label for submit button', () => {
      renderCreateComment();
      expect(screen.getByLabelText('Submit comment')).toBeInTheDocument();
    });

    it('should have proper ARIA label for cancel reply button', () => {
      renderCreateComment({
        parentCommentId: 'parent-id',
        replyingToUserName: 'John Doe',
      });
      expect(screen.getByLabelText('Cancel reply')).toBeInTheDocument();
    });
  });
});
