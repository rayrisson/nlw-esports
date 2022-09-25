import { Item, ToggleGroupItemImplProps } from "@radix-ui/react-toggle-group";

const ToggleGroupItem = (props: ToggleGroupItemImplProps) => {
  return (
    <Item
      {...props}
      className="w-8 h-8 rounded data-state-on:bg-violet-500 bg-zinc-900 transition-colors duration-300"
    >
      {props.children}
    </Item>
  );
};

export default ToggleGroupItem;
