import css from "./ErrorMessageComp.module.css";

interface ErrorMessageProps {
  error: string | null;
}

export default function ErrorMessageComp({ error }: ErrorMessageProps) {
  return <p className={css.text}>{error}</p>;
}
